require 'test_helper'

class EdificiosControllerTest < ActionController::TestCase
  setup do
    @edificio = edificios(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:edificios)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create edificio" do
    assert_difference('Edificio.count') do
      post :create, edificio: { direccion: @edificio.direccion, nombre_edificio: @edificio.nombre_edificio, nombre_propietario: @edificio.nombre_propietario }
    end

    assert_redirected_to edificio_path(assigns(:edificio))
  end

  test "should show edificio" do
    get :show, id: @edificio
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @edificio
    assert_response :success
  end

  test "should update edificio" do
    patch :update, id: @edificio, edificio: { direccion: @edificio.direccion, nombre_edificio: @edificio.nombre_edificio, nombre_propietario: @edificio.nombre_propietario }
    assert_redirected_to edificio_path(assigns(:edificio))
  end

  test "should destroy edificio" do
    assert_difference('Edificio.count', -1) do
      delete :destroy, id: @edificio
    end

    assert_redirected_to edificios_path
  end
end
