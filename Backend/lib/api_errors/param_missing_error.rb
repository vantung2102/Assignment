module ApiErrors
  class ParamMissingError < StandardError
    def initialize(param = nil)
      super(
        status: '400',
        title: 'Bad Request',
        detail: "Param '#{param}' is missing or the value is empty"
      )
    end
  end
end
