json.extract! inquilino, :id, :cedula, :nombre, :apellido, :telefono, :email, :estado, :created_at, :updated_at
json.url inquilino_url(inquilino, format: :json)
