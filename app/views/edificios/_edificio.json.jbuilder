json.extract! edificio, :id, :nombre_edificio, :nombre_propietario, :direccion, :created_at, :updated_at
json.url edificio_url(edificio, format: :json)