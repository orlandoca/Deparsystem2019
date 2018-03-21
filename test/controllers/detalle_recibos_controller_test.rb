require 'test_helper'

class DetalleRecibosControllerTest < ActionController::TestCase
  setup do
    @detalle_recibo = detalle_recibos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:detalle_recibos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create detalle_recibo" do
    assert_difference('DetalleRecibo.count') do
      post :create, detalle_recibo: { cuota: @detalle_recibo.cuota, descripcion: @detalle_recibo.descripcion, recibo_id: @detalle_recibo.recibo_id, total: @detalle_recibo.total }
    end

    assert_redirected_to detalle_recibo_path(assigns(:detalle_recibo))
  end

  test "should show detalle_recibo" do
    get :show, id: @detalle_recibo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @detalle_recibo
    assert_response :success
  end

  test "should update detalle_recibo" do
    patch :update, id: @detalle_recibo, detalle_recibo: { cuota: @detalle_recibo.cuota, descripcion: @detalle_recibo.descripcion, recibo_id: @detalle_recibo.recibo_id, total: @detalle_recibo.total }
    assert_redirected_to detalle_recibo_path(assigns(:detalle_recibo))
  end

  test "should destroy detalle_recibo" do
    assert_difference('DetalleRecibo.count', -1) do
      delete :destroy, id: @detalle_recibo
    end

    assert_redirected_to detalle_recibos_path
  end
end
