class ApplicationController < ActionController::API
  include Pundit::Authorization
  include Pagy::Backend

  include ExceptionFilter
  include JsonApiRender
end
