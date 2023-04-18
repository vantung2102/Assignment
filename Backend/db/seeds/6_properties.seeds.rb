# frozen_string_literal: true

ActiveRecord::Base.transaction do
  GroupProperty.destroy_all
  Property.destroy_all
  p 'Creating group properties...'
  resources = [
    [1, 'Laptop'],
    [2, 'Monitor'],
    [3, 'Furniture'],
    [4, 'Print'],
    [5, 'Projector'],
    [6, 'MacBook'],
    [7, 'Others']
  ]
  resources.each_with_index do |resource, index|
    GroupProperty.create!(id: index + 1, name: resource[1], description: "description for #{resource[1]} group property")
  end
  ActiveRecord::Base.connection.reset_pk_sequence!('group_properties')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
  # -------------------------------------------
  p 'Creating properties...'
  records = GroupProperty.all.each_with_object([]) do |record, records|
    id = record.id
    name = record.name

    case name
    when 'Laptop'
      records << ["#{name} Dell", id]
      records << ["#{name} HP", id]
      records << ["#{name} Asus", id]
      records << ["#{name} Acer", id]
      records << ["#{name} Lenovo", id]
    when 'Monitor'
      records << ["#{name} Dell", id]
      records << ["#{name} HP", id]
      records << ["#{name} Asus", id]
      records << ["#{name} Acer", id]
      records << ["#{name} Lenovo", id]
    when 'Furniture'
      records << ["#{name} Chair", id]
      records << ["#{name} Table", id]
      records << ["#{name} Bookshelf", id]
      records << ["#{name} Sofa", id]
      records << ["#{name} Cabinet", id]
    when 'Print'
      records << ["#{name} Dell", id]
      records << ["#{name} HP", id]
      records << ["#{name} Asus", id]
      records << ["#{name} Acer", id]
      records << ["#{name} Lenovo", id]
    when 'Projector'
      records << ["#{name} Dell", id]
      records << ["#{name} HP", id]
      records << ["#{name} Asus", id]
      records << ["#{name} Acer", id]
      records << ["#{name} Lenovo", id]
    when 'MacBook'
      records << ["#{name} M1 Pro", id]
      records << ["#{name} Air M1", id]
      records << ["#{name} M2 Pro", id]
      records << ["#{name} Air M2", id]
      records << ["#{name} 2019", id]
    else
      records << ['PS 5', id]
      records << ['PS 4', id]
      records << ['PS 3', id]
      records << ['Chess', id]
      records << ['Bida', id]
    end
  end

  records.each do |record|
    5.times do |time|
      Property.create!(
        code_seri: Faker::Code.nric,
        name: "#{record[0]} #{time}",
        brand: Faker::Commerce.brand,
        group_property_id: record[1],
        price: rand(1000..100_000),
        date_buy: Date.new,
        number_of_repairs: rand(0..5),
        status: 0
      )
    end
  end
  ActiveRecord::Base.connection.reset_pk_sequence!('properties')
  puts '***** DONE *****'
  puts '-------------------------------------------------'
rescue StandardError => e
  puts "***** FAILD: #{e} *****"
  puts '-------------------------------------------------'
end
