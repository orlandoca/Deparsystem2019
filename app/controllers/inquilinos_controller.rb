class InquilinosController < ApplicationController
  before_action :set_inquilino, only: [:show, :edit, :update, :destroy]

  # GET /inquilinos
  # GET /inquilinos.json
  def index
    @inquilinos = Inquilino.all
  end

  # GET /inquilinos/1
  # GET /inquilinos/1.json
  def show
  end

  # GET /inquilinos/new
  def new
    @inquilino = Inquilino.new
  end

  # GET /inquilinos/1/edit
  def edit
  end

  # POST /inquilinos
  # POST /inquilinos.json
  def create
    @inquilino = Inquilino.new(inquilino_params)

    respond_to do |format|
      if @inquilino.save
        format.html { redirect_to @inquilino, notice: 'INQUILINO CREADO CORRECTAMENTE.' }
        format.json { render :show, status: :created, location: @inquilino }
      else
        format.html { render :new }
        format.json { render json: @inquilino.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /inquilinos/1
  # PATCH/PUT /inquilinos/1.json
  def update
    respond_to do |format|
      if @inquilino.update(inquilino_params)
        format.html { redirect_to @inquilino, notice: 'Inquilino was successfully updated.' }
        format.json { render :show, status: :ok, location: @inquilino }
      else
        format.html { render :edit }
        format.json { render json: @inquilino.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /inquilinos/1
  # DELETE /inquilinos/1.json
  def destroy
    @inquilino.destroy
    respond_to do |format|
      format.html { redirect_to inquilinos_url, notice: 'Inquilino was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inquilino
      @inquilino = Inquilino.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def inquilino_params
      params.require(:inquilino).permit(:cedula, :nombre, :apellido, :telefono, :email, :estado)
    end
end
