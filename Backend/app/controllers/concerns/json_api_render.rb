module JsonApiRender
  extend ActiveSupport::Concern

  included do
    include Pagination
  end

  def render_resource_collection(resources, options = {})
    serializer_class = options[:each_serializer] || "#{resources.klass.name}Serializer".constantize
    serializer_options = options.slice(*accepted_jsonapi_serializer_options).merge(is_collection: true)
    serializer_options[:meta] = (serializer_options[:meta] || {}).merge(paginate_meta(options[:pagy])) if options[:pagy]
    render json: serializer_class.new(resources, serializer_options), status: options[:status] || :ok
  end

  def render_resource(resource, options = {})
    serializer_class = options[:serializer] || "#{resource.class.name}Serializer".constantize
    serializer_options = options.slice(*accepted_jsonapi_serializer_options).merge(is_collection: false)
    render json: serializer_class.new(resource, serializer_options), status: options[:status] || :ok
  end

  def render_resource_errors(errors, options = {})
    render jsonapi_errors: errors, status: options[:status] || :unprocessable_entity
  end

  private

  def accepted_jsonapi_serializer_options
    %i[meta links include params]
  end
end