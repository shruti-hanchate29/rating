import { RatingConstants } from './rating-constants';

export const files = [
    {
      name: 'Rating Manager',
      type: RatingConstants.TYPE_DOMAIN_TP,
      children: [
        {
          name: 'Property',
          type: RatingConstants.TYPE_DOMAIN,
          children: [
            {
              name: 'Novodhi',
              type: RatingConstants.TYPE_PROJECT,
              children: [
                {
                  name: 'Auto',
                  type: RatingConstants.TYPE_PRODUCT,
                  children: [
                    {
                      name: 'Ohio',
                      type: RatingConstants.TYPE_STATE,
                      children: [
                        { name: 'OH_AUTO_1', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'OH_AUTO_2', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'OH_AUTO_3', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'Global', type: RatingConstants.TYPE_ZONE1}
                      ]
                    },
                    {
                      name: 'Texas',
                      type: RatingConstants.TYPE_STATE,
                      children: [
                        { name: 'TX_AUTO_1', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'TX_AUTO_2', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'Global', type: RatingConstants.TYPE_ZONE1}
                      ]
                    }
                  ]
                },
                {
                  name: 'Home',
                  type: RatingConstants.TYPE_PRODUCT
                },
                {
                  name: 'Commercial',
                  type: RatingConstants.TYPE_PRODUCT
                },
                { name: 'Universal', type: RatingConstants.TYPE_ZONE}
              ]
            }
          ]
        },
        {
          name: 'Life',
          type: RatingConstants.TYPE_DOMAIN,
          children: [
            {
              name: 'Almere',
              type: RatingConstants.TYPE_PROJECT,
              children: [
                {
                  name: 'Auto',
                  type: RatingConstants.TYPE_PRODUCT,
                  children: [
                    {
                      name: 'California',
                      type: RatingConstants.TYPE_STATE,
                      children: [
                        { name: 'CA_AUTO_1', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'CA_AUTO_2', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'CA_AUTO_3', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'Global', type: RatingConstants.TYPE_ZONE1}
                      ]
                    }
                  ]
                },
                {
                  name: 'Home',
                  type: RatingConstants.TYPE_PRODUCT
                },
                {
                  name: 'Commercial',
                  type: RatingConstants.TYPE_PRODUCT,
                  children: [
                    {
                      name: 'Georgia',
                      type: RatingConstants.TYPE_STATE,
                      children: [
                        { name: 'GA_COMM_1', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'GA_COMM_2', type: RatingConstants.TYPE_PROGRAM},
                        { name: 'Global', type: RatingConstants.TYPE_ZONE1}
                      ]
                    }
                  ]
                },
                { name: 'Universal', type: RatingConstants.TYPE_ZONE}
              ]
            }
          ]
        }
      ]
    }
  ];
