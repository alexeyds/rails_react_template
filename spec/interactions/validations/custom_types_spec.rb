require 'rails_helper'

RSpec.describe Validations::CustomTypes do
  describe '::Email' do
    let(:email) { Validations::CustomTypes::Email }

    it 'strips given string' do
      expect(email['  foobar ']).to eq('foobar')
    end

    it 'converts given string to lowercase' do
      expect(email[' foo@BAR ']).to eq('foo@bar')
    end
  end
end
