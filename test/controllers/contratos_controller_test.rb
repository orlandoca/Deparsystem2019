require 'test_helper'

class ContratosControllerTest < ActionController::TestCase
  setup do
    @contrato = contratos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:contratos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create contrato" do
    assert_difference('Contrato.count') do
      post :create, contrato: { departamento_id: @contrato.departamento_id, fecha_contrato: @contrato.fecha_contrato, fin_contrato: @contrato.fin_contrato, inicio_contrato: @contrato.inicio_contrato, inquilino_id: @contrato.inquilino_id, vencimiento: @contrato.vencimiento }
    end

    assert_redirected_to contrato_path(assigns(:contrato))
  end

  test "should show contrato" do
    get :show, id: @contrato
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @contrato
    assert_response :success
  end

  test "should update contrato" do
    patch :update, id: @contrato, contrato: { departamento_id: @contrato.departamento_id, fecha_contrato: @contrato.fecha_contrato, fin_contrato: @contrato.fin_contrato, inicio_contrato: @contrato.inicio_contrato, inquilino_id: @contrato.inquilino_id, vencimiento: @contrato.vencimiento }
    assert_redirected_to contrato_path(assigns(:contrato))
  end

  test "should destroy contrato" do
    assert_difference('Contrato.count', -1) do
      delete :destroy, id: @contrato
    end

    assert_redirected_to contratos_path
  end
end
