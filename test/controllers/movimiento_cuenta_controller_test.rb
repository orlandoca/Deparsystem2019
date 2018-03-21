require 'test_helper'

class MovimientoCuentaControllerTest < ActionController::TestCase
  setup do
    @movimiento_cuentum = movimiento_cuenta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:movimiento_cuenta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create movimiento_cuentum" do
    assert_difference('MovimientoCuentum.count') do
      post :create, movimiento_cuentum: { contrado_id: @movimiento_cuentum.contrado_id, cuota: @movimiento_cuentum.cuota, estado: @movimiento_cuentum.estado, monto: @movimiento_cuentum.monto, vencimiento: @movimiento_cuentum.vencimiento }
    end

    assert_redirected_to movimiento_cuentum_path(assigns(:movimiento_cuentum))
  end

  test "should show movimiento_cuentum" do
    get :show, id: @movimiento_cuentum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @movimiento_cuentum
    assert_response :success
  end

  test "should update movimiento_cuentum" do
    patch :update, id: @movimiento_cuentum, movimiento_cuentum: { contrado_id: @movimiento_cuentum.contrado_id, cuota: @movimiento_cuentum.cuota, estado: @movimiento_cuentum.estado, monto: @movimiento_cuentum.monto, vencimiento: @movimiento_cuentum.vencimiento }
    assert_redirected_to movimiento_cuentum_path(assigns(:movimiento_cuentum))
  end

  test "should destroy movimiento_cuentum" do
    assert_difference('MovimientoCuentum.count', -1) do
      delete :destroy, id: @movimiento_cuentum
    end

    assert_redirected_to movimiento_cuenta_path
  end
end
