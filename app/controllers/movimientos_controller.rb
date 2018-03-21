class MovimientosController < ApplicationController
  before_action :set_movimiento, only: [:show, :edit, :update, :destroy]

  # GET /movimientos
  # GET /movimientos.json
  def index
    @movimientos = Movimiento.all
  end

  # GET /movimientos/1
  # GET /movimientos/1.json
  def show
  end

  # GET /movimientos/new
  def new
    @movimiento = Movimiento.new
  end

  # GET /movimientos/1/edit
  def edit
  end

  # POST /movimientos
  # POST /movimientos.json
  def create
    @movimiento = Movimiento.new(movimiento_params)

    respond_to do |format|
      if @movimiento.save
        format.html { redirect_to @movimiento, notice: 'Movimiento was successfully created.' }
        format.json { render :show, status: :created, location: @movimiento }
      else
        format.html { render :new }
        format.json { render json: @movimiento.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /movimientos/1
  # PATCH/PUT /movimientos/1.json
  def update
    respond_to do |format|
      if @movimiento.update(movimiento_params)
        format.html { redirect_to @movimiento, notice: 'Movimiento was successfully updated.' }
        format.json { render :show, status: :ok, location: @movimiento }
      else
        format.html { render :edit }
        format.json { render json: @movimiento.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /movimientos/1
  # DELETE /movimientos/1.json
  def destroy
    @movimiento.destroy
    respond_to do |format|
      format.html { redirect_to movimientos_url, notice: 'Movimiento was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def pagar

    recibo = Recibo.new
    movimiento= Movimiento.new

    params[:movimientos_id].each do |id|
      movimiento = Movimiento.find(id)
    end
    #creamos el recibo de pago y actualizamos el movimiento
    recibo = Recibo.create!(contrato_id: movimiento.contrato_id)
    params[:movimientos_id].each do |id|
      movimiento = Movimiento.find(id)
      detalle_recibo = DetalleRecibo.create!(recibo_id: recibo.id, cuota: movimiento.cuota, descripcion: "PAGO DE CUOTA NUMERO:  #{movimiento.cuota}" , total: movimiento.monto)
      movimiento.update(estado: true)
      @caja = Caja.where(estado: 0).last #obtiene la ultima caja abierta
      @mov_caja = MovCaja.create!(caja_id: @caja.id, concepto: detalle_recibo.descripcion, ingreso: detalle_recibo.total , egreso: 0, saldo: @caja.cierre.to_i + detalle_recibo.total)#agregar un movimiento de caja
      @caja.update(cierre: @caja.cierre.to_i + detalle_recibo.total, entrada:  @caja.entrada.to_i + detalle_recibo.total) #actualiza el monto de caja

    end
    #cambiar estado al pagar la ultima cuota del departamente a disponible
    mov = Movimiento.where(recibo_id: recibo.id).where(estado: false)
    contrato = Contrato.find(movimiento.contrato_id)
    departamento = Departamento.find(contrato.departamento_id)
    if (mov != nil)
        departamento.update(estado: false)
    end



    respond_to do |format|
      format.html { redirect_to recibo, notice: 'SE HA GENERADO EXITOSAMENTE EL RECIBO.' }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movimiento
      @movimiento = Movimiento.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def movimiento_params
      params.require(:movimiento).permit(:contrato_id, :cuota, :vencimiento, :monto, :estado)
    end
end
