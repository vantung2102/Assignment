class Api::V1::StaffManagement::StaffContractsController < Api::V1::BaseController
  def index
    authorize StaffContract
    pagy, staff_contracts = paginate(StaffContract.order(created_at: :desc))
    render_resource_collection(staff_contracts, pagy: pagy)
  end

  def show
    authorize StaffContract
    render_resource(staff_contract)
  end

  def create
    authorize StaffContract
    staff_contract = StaffContract.new(staff_contract_params)
    StaffContract.save ? render_resource(staff_contract, status: :created) : render_resource_errors(staff_contract.errors)
  end

  def update
    authorize StaffContract
    StaffContract.update(staff_contract_params) ? render_resource(staff_contract) : render_resource_errors(staff_contract.errors)
  end

  def destroy
    authorize StaffContract
    StaffContract.destroy!
    head :no_content
  end

  private

  def staff_contract
    @staff_contract ||= StaffContract.find(params[:id])
  end

  def staff_contract_params
    params.require(:staff_contract).permit(:title, :description, :start_date, :end_date, :status)
  end
end
