json.extract! contrato, :id, :inquilino_id, :departamento_id, :fecha_contrato, :inicio_contrato, :fin_contrato, :vencimiento, :created_at, :updated_at
json.url contrato_url(contrato, format: :json)