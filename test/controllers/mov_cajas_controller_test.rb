require 'test_helper'

class MovCajasControllerTest < ActionController::TestCase
  setup do
    @mov_caja = mov_cajas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:mov_cajas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create mov_caja" do
    assert_difference('MovCaja.count') do
      post :create, mov_caja: { caja_id: @mov_caja.caja_id, concepto: @mov_caja.concepto, egreso: @mov_caja.egreso, ingreso: @mov_caja.ingreso, saldo: @mov_caja.saldo }
    end

    assert_redirected_to mov_caja_path(assigns(:mov_caja))
  end

  test "should show mov_caja" do
    get :show, id: @mov_caja
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @mov_caja
    assert_response :success
  end

  test "should update mov_caja" do
    patch :update, id: @mov_caja, mov_caja: { caja_id: @mov_caja.caja_id, concepto: @mov_caja.concepto, egreso: @mov_caja.egreso, ingreso: @mov_caja.ingreso, saldo: @mov_caja.saldo }
    assert_redirected_to mov_caja_path(assigns(:mov_caja))
  end

  test "should destroy mov_caja" do
    assert_difference('MovCaja.count', -1) do
      delete :destroy, id: @mov_caja
    end

    assert_redirected_to mov_cajas_path
  end
end
