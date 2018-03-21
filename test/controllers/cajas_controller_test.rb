require 'test_helper'

class CajasControllerTest < ActionController::TestCase
  setup do
    @caja = cajas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cajas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create caja" do
    assert_difference('Caja.count') do
      post :create, caja: { apertura: @caja.apertura, cierre: @caja.cierre, entrada: @caja.entrada, estado: @caja.estado, fecha_cierre: @caja.fecha_cierre, salida: @caja.salida, usuario_id: @caja.usuario_id }
    end

    assert_redirected_to caja_path(assigns(:caja))
  end

  test "should show caja" do
    get :show, id: @caja
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @caja
    assert_response :success
  end

  test "should update caja" do
    patch :update, id: @caja, caja: { apertura: @caja.apertura, cierre: @caja.cierre, entrada: @caja.entrada, estado: @caja.estado, fecha_cierre: @caja.fecha_cierre, salida: @caja.salida, usuario_id: @caja.usuario_id }
    assert_redirected_to caja_path(assigns(:caja))
  end

  test "should destroy caja" do
    assert_difference('Caja.count', -1) do
      delete :destroy, id: @caja
    end

    assert_redirected_to cajas_path
  end
end
