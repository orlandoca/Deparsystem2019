class MovCajasController < ApplicationController
  before_action :set_mov_caja, only: [:show, :edit, :update, :destroy]

  # GET /mov_cajas
  # GET /mov_cajas.json
  def index
    @mov_cajas = MovCaja.all
  end

  # GET /mov_cajas/1
  # GET /mov_cajas/1.json
  def show
  end

  # GET /mov_cajas/new
  def new
    @mov_caja = MovCaja.new
  end

  # GET /mov_cajas/1/edit
  def edit
  end

  # POST /mov_cajas
  # POST /mov_cajas.json
  def create
    @mov_caja = MovCaja.new(mov_caja_params)

    respond_to do |format|
      if @mov_caja.save
        format.html { redirect_to @mov_caja, notice: 'Mov caja was successfully created.' }
        format.json { render :show, status: :created, location: @mov_caja }
      else
        format.html { render :new }
        format.json { render json: @mov_caja.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mov_cajas/1
  # PATCH/PUT /mov_cajas/1.json
  def update
    respond_to do |format|
      if @mov_caja.update(mov_caja_params)
        format.html { redirect_to @mov_caja, notice: 'Mov caja was successfully updated.' }
        format.json { render :show, status: :ok, location: @mov_caja }
      else
        format.html { render :edit }
        format.json { render json: @mov_caja.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mov_cajas/1
  # DELETE /mov_cajas/1.json
  def destroy
    @mov_caja.destroy
    respond_to do |format|
      format.html { redirect_to mov_cajas_url, notice: 'Mov caja was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mov_caja
      @mov_caja = MovCaja.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mov_caja_params
      params.require(:mov_caja).permit(:caja_id, :concepto, :ingreso, :egreso, :saldo)
    end
end
