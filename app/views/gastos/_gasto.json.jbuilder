json.extract! gasto, :id, :edificio_id, :cantidad, :detalle, :costo, :total, :created_at, :updated_at
json.url gasto_url(gasto, format: :json)
