require 'rails_helper'

RSpec.describe Validations::ApplicationContract do
  describe '#validate_params' do
    phone_contract = Class.new(Validations::ApplicationContract) do
      params do
        required(:phone).filled(:string)
      end
    end

    it 'returns success if params are valid' do
      result = phone_contract.new.validate_params(phone: '123', id: 32)
      expect(result.success).to eq(phone: '123')
    end

    it 'returns failure if params are invalid' do
      result = phone_contract.new.validate_params({})

      error = result.failure
      expect(error).to be_present
      expect(error[:message]).to be_present
      expect(error[:type]).to be_present
      expect(error[:details][:phone]).to be_present
    end

    it 'works with action controller params' do
      params = ActionController::Parameters.new(phone: '123', id: 321)
      result = phone_contract.new.validate_params(params)
      expect(result.success).to eq(phone: '123')
    end
  end

  describe '#validate_record_exists' do
    user_contract = Class.new(Validations::ApplicationContract) do
      params do
        required(:user_id).filled(:integer)
      end

      rule(:user_id) do
        validate_record_exists(self, User)
      end
    end

    it "adds an error if record doesn't exist" do
      result = user_contract.new.call(user_id: 123)
      expect(result.errors.to_h[:user_id]).to be_present
    end

    it "returns success if record exists" do
      user = create(:user, id: 123)
      result = user_contract.new.call(user_id: 123)
      expect(result.errors.to_h).to be_empty
    end

    it "suports search by fields other than id" do
      email_contract = Class.new(Validations::ApplicationContract) do
        params do
          required(:email).filled(:string)
        end

        rule(:email) do
          validate_record_exists(self, User, :email)
        end
      end

      user = create(:user, email: 'test@mail.com')
      result = email_contract.new.call(email: 'test@mail.com')

      expect(result.errors.to_h).to be_empty
    end
  end

  describe '::use_schemas with multiple schemas' do
    def self.build_schema(attr_name)
      Class.new(Validations::ApplicationSchema) do
        define_params do
          required(attr_name).filled(:string)
        end

        define_rules do
          rule(attr_name) do
            key.failure(:unexpected_key) if value == "wrong_#{attr_name}"
          end
        end
      end
    end

    email_schema = build_schema(:email)
    phone_schema = build_schema(:phone)

    contract = Class.new(Validations::ApplicationContract) do
      use_schemas(email_schema, phone_schema)
    end

    it 'uses params from all schemas' do
      result = contract.new.call(email: 'foo', phone: '1234')
      expect(result.to_h).to eq(email: 'foo', phone: '1234')
    end

    it 'uses rules from all schemas' do
      result = contract.new.call(email: 'wrong_email', phone: 'wrong_phone')
      expect(result.errors.to_h.keys).to match_array([:email, :phone])
    end
  end
end
