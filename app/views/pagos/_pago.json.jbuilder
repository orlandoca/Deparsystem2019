json.extract! pago, :id, :contrato_id, :inquilino_id, :fecha_pago, :monto, :estado, :created_at, :updated_at
json.url pago_url(pago, format: :json)