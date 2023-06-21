module ApiErrors
  class BadRequestError < StandardError
    def initialize(message = nil)
      super(
        status: '400',
        title: 'Bad Request',
        detail: message || 'The request can not be processed'
      )
    end
  end
end
