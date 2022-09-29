const mockCatalogTypeData = {
  'page': 1,
  'count': 1,
  'num_pages': 1,
  'results': [
    {
      'id': 1,
      'slug': 'fence-side',
      'label': null,
      'config': {
        'id': 158439,
        // eslint-disable-next-line max-len
        'schema': '3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,32,47,48,49,130,144,220,221,222,223,226,227,228,229,236,252',
        // eslint-disable-next-line max-len
        'code': 'F6,PF,SL8,BB,FT,PFPK8,RC,POS,PT4,PPT,PD2,PH8,PRZ,KPT,1K8,NULL,LZ,L0,RW0,CZS,PT,R24,RCZ,SLZ,RPNA,PSN,NA,PGNA,CRNA,FPNS,NAPC,MHNA,MSZ,PCNA,NA',
        // eslint-disable-next-line max-len
        'sequence': '1.00,2.00,3.00,4.00,7.00,8.00,9.00,5.00,10.00,11.00,12.00,13.00,14.00,18.00,17.00,19.00,27.00,25.00,30.00,33.00,20.00,21.00,23.00,34.00,22.00,31.00,32.00,6.00,24.00,0.00,16.00,28.00,29.00,15.00,32.00'
      },
      'property_config': {
        'id': 160203,
        'schema': '1,2,132,231,247,248,253,254',
        'code': 'DY,DRY,SSNA,NDD,PLNA,PRNA,ELPY,ERPN',
        'sequence': '2.00,3.00,4.00,5.00,0.00,1.00,6.00,7.00'
      }
    },
  ]
}

jest.mock('@ergeon/erg-catalog-rules/dist/attribute-calculator/catalogTypesAPI', () => {
  return {
    getApiData: () => mockCatalogTypeData,
  };
});
