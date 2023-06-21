module ApiErrors
  class InternalServerError < StandardError
    def initialize(message = nil)
      super(
        status: '500',
        title: 'Internal Server Error',
        detail: message || "We're sorry, but something went wrong"
      )
    end
  end
end
