import _ from 'lodash';
import Constants from './constants.js'

const SubscriptionUtil = {
  GetInfoFromStripeCustomer: function(customer) {
    const subPlanIdMatchesTier = (sub, tier) => {
      const subPlanId = sub.plan.id
      const tierIdProd = Constants.TIERS.props[tier].stripe_tier_id_prod
      const tierIdTest = Constants.TIERS.props[tier].stripe_tier_id_test
      return subPlanId === tierIdTest || subPlanId === tierIdProd
    }

    var result = {
      tierType: Constants.TIERS.TRIAL,
      ...Constants.TIERS.props[Constants.TIERS.TRIAL],
    }
  
    if (_.get(customer, 'subscriptions.total_count') > 0) {
      customer.subscriptions.data.forEach(s => {
        if(subPlanIdMatchesTier(s, Constants.TIERS.LEGACY) && s.status === "active") {
          result = {
            tierType: Constants.TIERS.LEGACY,
            subStartTs: s.created,
            ...Constants.TIERS.props[Constants.TIERS.LEGACY],
          }
        }
        if(subPlanIdMatchesTier(s, Constants.TIERS.PREMIUM) && s.status === "active") {
          result = {
            tierType: Constants.TIERS.PREMIUM,
            subStartTs: s.created,
            subNextBillingDate: s.current_period_end,
            ...Constants.TIERS.props[Constants.TIERS.PREMIUM]
          }
        }
      })
    }
  
    return result
  }
}

export default SubscriptionUtil;
