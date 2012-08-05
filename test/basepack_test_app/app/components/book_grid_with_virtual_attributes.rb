class BookGridWithVirtualAttributes < Netzke::Basepack::GridPanel
  include Extras::BookPresentation

  model "Book"

  def columns
    custom_fields
  end

  component :add_window do |c|
    super(c)
    c.form_config.items = custom_fields
  end

  component :edit_window do |c|
    super(c)
    c.form_config.items = custom_fields
  end

  def custom_fields
    [
      :title,
      {:name => "author__first_name", :setter => author_first_name_setter},
      :exemplars,
      {:name => "in_abundance", :getter => in_abundance_getter}
    ]
  end
end
