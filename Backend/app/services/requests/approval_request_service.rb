class Requests::ApprovalRequestService < ApplicationService
  def initialize(request_company_id)
    @request_company_id = request_company_id
  end

  def call
    request_company = RequestCompany.find(request_company_id)
    request_company.update(status: RequestCompany.statuses[:approval])
  end

  private

  attr_accessor :request_company_id
end