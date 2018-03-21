json.extract! detalle_recibo, :id, :recibo_id, :cuota, :descripcion, :total, :created_at, :updated_at
json.url detalle_recibo_url(detalle_recibo, format: :json)
