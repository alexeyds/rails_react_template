require 'rails_helper'

RSpec.describe User do
  describe "#create" do
    let(:first_user) { User.first }

    it 'digests user password' do
      User.create!(password: '123')

      expect(User.count).to eq(1)
      expect(first_user.password).to eq(nil)
      expect(first_user.password_digest).not_to eq(nil)
    end
  end

  describe "#authenticate" do
    it "returns user if password is valid" do
      user = User.create!(password: '123')
      expect(user.authenticate('123')).to eq(user)
    end

    it "returns false if password is invalid" do
      user = User.create!(password: '123')
      expect(user.authenticate('1234')).to eq(false)
    end
  end
end
