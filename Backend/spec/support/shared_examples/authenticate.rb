shared_examples "authenticate" do
  it 'No login' do
    send(http, action, params: params)
    expect(response.status).to eq(401)
  end
end