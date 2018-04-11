class ReportePdf < Prawn::Document
  def initialize(recibo)
    super()
    @recibo = recibo
    header
    text_content
    table_content
    table_content2

  end

  def header
    #This inserts an image in the pdf file and sets the size of the image
    #image "#{Rails.root}/app/assets/images/header.png", width: 530, height: 150
  end

  def text_content
    # The cursor for inserting content starts on the top left of the page. Here we move it down a little to create more space between the text and the image inserted above
    y_position = cursor - 50

    # The bounding_box takes the x and y coordinates for positioning its content and some options to style it
    #  bounding_box([0, cursor - 10], :width => 1200, :height => 100) do
    #   text "FACTURA", size: 20, style: :bold
    # end
    # bounding_box([0, y_position], :width => 1200, :height => 100) do
    #   text "Nº FACTURA", size: 10, style: :bold
    #   text "#{@factura.nro_fac}"
    # end
    bounding_box([0, 600], :width => 1200, :height => 100) do
      text "Fecha: #{@recibo.created_at.strftime('%m/%d/%Y')}", size: 10, style: :bold
    end

    bounding_box([0, 580], :width => 300, :height => 300) do
      text "Nombre: #{@recibo.contrato.inquilino.nombre} #{@recibo.contrato.inquilino.apellido}", size: 10, style: :bold
     end

     

    move_down -420
    bounding_box([0, cursor], :width => 290, :height => 90) do
       transparent(0.5) { stroke_bounds }
       move_down 10
       indent(20) do
        text "Colegio Parroquial Privado San Pio X", size: 20, style: :bold
       end
       indent(30) do
         text "Padre Jose Kreusser Nº306 e/Juan Leon Mallorquin", size: 10
         text "Telef.:(071)203778 Encarnacion - Paraguay", size: 10
         # stroke_horizontal_rule
       end
    end
    
    move_down -300
    bounding_box([300, 700], :width => 240, :height => 90) do
       transparent(0.5) { stroke_bounds }
       move_down 10
       indent(20) do
        text "Timbrado Nº XXXXXXXX", size: 10, style: :bold
        text "RUC: 80056885-0", size: 15, style: :bold
        text "Inicio Vigencia: 05/setiembre/2016", size: 8
        text "Fin de Vigencia: 30/setiembre/2017", size: 8
        text "FACTURA Nº", size: 15, style: :bold
        text "#{@recibo.id}", size: 10
       end
    end
     

  end


  def table_content
    # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    # Then I set the table column widths
    table detalles_rows do
      row(0).font_style = :bold
      self.header = true
      self.row_colors = ['DDDDDD', 'FFFFFF']
      self.column_widths = [40, 300, 200]
    end
  end
  
  def detalles_rows
    move_down 45
    [['Numero de Cuotaº', 'Descripcion', 'total']]+
        @recibo.detalle_recibos.map do |detalle|
        [detalle.cuota, detalle.descripcion, detalle.total]
      end
  end


  def table_content2
    # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    # Then I set the table column widths
    table detalles_rows2 do
      row(0).font_style = :bold
      self.header = true
      self.row_colors = ['DDDDDD', 'FFFFFF']
      self.column_widths = [340, 200]
    end
  end
  
  def detalles_rows2
    move_down 40
    @total=0

    @recibo.detalle_recibos.each {|detalle| @total += detalle.total}

    [['TOTAL ',  @total]]
  end

end