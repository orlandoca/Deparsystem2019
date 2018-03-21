json.extract! movimiento, :id, :contrato_id, :cuota, :vencimiento, :monto, :estado, :created_at, :updated_at
json.url movimiento_url(movimiento, format: :json)