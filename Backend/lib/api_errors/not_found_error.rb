module ApiErrors
  class NotFoundError < StandardError
    def initialize(message = nil)
      super(
        status: '404',
        title: 'Not Found',
        detail: message || 'The finding resource can not be found'
      )
    end
  end
end
