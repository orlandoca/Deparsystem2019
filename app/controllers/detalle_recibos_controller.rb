class DetalleRecibosController < ApplicationController
  before_action :set_detalle_recibo, only: [:show, :edit, :update, :destroy]

  # GET /detalle_recibos
  # GET /detalle_recibos.json
  def index
    @detalle_recibos = DetalleRecibo.all
  end

  # GET /detalle_recibos/1
  # GET /detalle_recibos/1.json
  def show
  end

  # GET /detalle_recibos/new
  def new
    @detalle_recibo = DetalleRecibo.new
  end

  # GET /detalle_recibos/1/edit
  def edit
  end

  # POST /detalle_recibos
  # POST /detalle_recibos.json
  def create
    @detalle_recibo = DetalleRecibo.new(detalle_recibo_params)

    respond_to do |format|
      if @detalle_recibo.save
        format.html { redirect_to @detalle_recibo, notice: 'Detalle recibo was successfully created.' }
        format.json { render :show, status: :created, location: @detalle_recibo }
      else
        format.html { render :new }
        format.json { render json: @detalle_recibo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /detalle_recibos/1
  # PATCH/PUT /detalle_recibos/1.json
  def update
    respond_to do |format|
      if @detalle_recibo.update(detalle_recibo_params)
        format.html { redirect_to @detalle_recibo, notice: 'Detalle recibo was successfully updated.' }
        format.json { render :show, status: :ok, location: @detalle_recibo }
      else
        format.html { render :edit }
        format.json { render json: @detalle_recibo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /detalle_recibos/1
  # DELETE /detalle_recibos/1.json
  def destroy
    @detalle_recibo.destroy
    respond_to do |format|
      format.html { redirect_to detalle_recibos_url, notice: 'Detalle recibo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_detalle_recibo
      @detalle_recibo = DetalleRecibo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def detalle_recibo_params
      params.require(:detalle_recibo).permit(:recibo_id, :cuota, :descripcion, :total)
    end
end
