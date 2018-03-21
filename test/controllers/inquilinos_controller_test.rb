require 'test_helper'

class InquilinosControllerTest < ActionController::TestCase
  setup do
    @inquilino = inquilinos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:inquilinos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create inquilino" do
    assert_difference('Inquilino.count') do
      post :create, inquilino: { apellido: @inquilino.apellido, cedula: @inquilino.cedula, email: @inquilino.email, estado: @inquilino.estado, nombre: @inquilino.nombre, telefono: @inquilino.telefono }
    end

    assert_redirected_to inquilino_path(assigns(:inquilino))
  end

  test "should show inquilino" do
    get :show, id: @inquilino
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @inquilino
    assert_response :success
  end

  test "should update inquilino" do
    patch :update, id: @inquilino, inquilino: { apellido: @inquilino.apellido, cedula: @inquilino.cedula, email: @inquilino.email, estado: @inquilino.estado, nombre: @inquilino.nombre, telefono: @inquilino.telefono }
    assert_redirected_to inquilino_path(assigns(:inquilino))
  end

  test "should destroy inquilino" do
    assert_difference('Inquilino.count', -1) do
      delete :destroy, id: @inquilino
    end

    assert_redirected_to inquilinos_path
  end
end
