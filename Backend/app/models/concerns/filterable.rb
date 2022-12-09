module Filterable
  extend ActiveSupport::Concern

  def filter(filtering_params)
    results = self.all
    filtering_params.each do |key, value|
      results = results.send("filter_by_#{key}", value) if value.present?
    end
    results
  end
end