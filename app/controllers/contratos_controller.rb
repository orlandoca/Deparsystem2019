class ContratosController < ApplicationController
  before_action :set_contrato, only: [:show, :edit, :update, :destroy]

  # GET /contratos
  # GET /contratos.json
  def index
    @contratos = Contrato.all
  end

  # GET /contratos/1
  # GET /contratos/1.json
  def show
  end

  # GET /contratos/new
  def new
    @contrato = Contrato.new
  end

  # GET /contratos/1/edit
  def edit
  end

  def dynamic_edificios
    @edificios = Edificio.find(:all)
  end

  # POST /contratos
  # POST /contratos.json
  def create
    @contrato = Contrato.new(contrato_params)

    respond_to do |format|
      if @contrato.save
        @departamento = Departamento.find_by(id: @contrato.departamento_id)
        @departamento.update(estado: 1)
        @fecha = @contrato.inicio_contrato
        cantidadmeses= ((@contrato.fin_contrato.year * 12 + @contrato.fin_contrato.month) - (@contrato.inicio_contrato.year * 12 + @contrato.inicio_contrato.month))
        for i in 1..cantidadmeses do
          @movimiento = Movimiento.create(contrato_id: @contrato.id, cuota:i , monto: @contrato.departamento.precio , vencimiento: @fecha + 1.months , estado: 0)
          @fecha = @fecha + 1.months
        end
        @movimiento.save
        @contrato.update(fin_contrato: @fecha)
        format.html { redirect_to @contrato, notice: 'Contrato creado exitosamente.' }
        format.json { render :show, status: :created, location: @contrato }
      else
        format.html { render :new }
        format.json { render json: @contrato.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /contratos/1
  # PATCH/PUT /contratos/1.json
  def update
    respond_to do |format|
      if @contrato.update(contrato_params)
        format.html { redirect_to @contrato, notice: 'Contrato was successfully updated.' }
        format.json { render :show, status: :ok, location: @contrato }
      else
        format.html { render :edit }
        format.json { render json: @contrato.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contratos/1
  # DELETE /contratos/1.json
  def destroy
    @contrato.destroy
    respond_to do |format|
      format.html { redirect_to contratos_url, notice: 'Contrato was successfully destroyed.' }
      format.json { head :no_content }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contrato
      @contrato = Contrato.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contrato_params
      params.require(:contrato).permit(:inquilino_id, :edificio_id, :departamento_id, :fecha_contrato, :inicio_contrato, :fin_contrato, :vencimiento, :imagen)
    end
end
