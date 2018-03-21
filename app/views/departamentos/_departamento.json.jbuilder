json.extract! departamento, :id, :edificio_id, :nombre_departamento, :precio, :descripcion, :estado, :created_at, :updated_at
json.url departamento_url(departamento, format: :json)