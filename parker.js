var parks = [
    //sup 'Always'
    {
        name: 'Kungsträdgården',
        lat: 59.331375,
        lng: 18.071424,
        drink: 'Always'
    },
    {
        name: 'Berzelii park',
        lat: 59.332538,
        lng: 18.075066,
        drink: 'Always'
    },
    {
        name: 'Djurgården',
        lat: 59.326993,
        lng: 18.121256,
        drink: 'Always'
    },
    {
        name: 'Gustaf Adolfsparken',
        lat: 59.337225,
        lng: 18.097979,
        drink: 'Always'
    },
    {
        name: 'Gärdet',
        lat: 59.337102,
        lng: 18.110871,
        drink: 'Always'
    },
    {
        name: 'Humlegården',
        lat: 59.339611,
        lng: 18.072231,
        drink: 'Always'
    },
    {
        name: 'Tessinparken',
        lat: 59.342235,
        lng: 18.094118,
        drink: 'Always'
    },
    {
        name: 'Klipporna i Fredhäll',
        lat: 59.328683,
        lng: 18.001143,
        drink: 'Always'
    },
    {
        name: 'Långholmen',
        lat: 59.322128,
        lng: 18.032814,
        drink: 'Always'
    },
    {
        name: 'Tegnérlunden',
        lat: 59.338108,
        lng: 18.054206,
        drink: 'Always'
    },
    {
        name: 'Vanadislunden',
        lat: 59.348034,
        lng: 18.055280,
        drink: 'Always'
    },
    {
        name: 'Vasaparken',
        lat: 59.340473,
        lng: 18.043717,
        drink: 'Always'
    },
    {
        name: 'Hagaparken',
        lat: 59.361712,
        lng: 18.034181,
        drink: 'Always'
    },
    {
        name: 'Ulriksdals slottspark',
        lat: 59.390343,
        lng: 18.014228,
        drink: 'Always'
    },
    //drick mellan 07-00
    {
        name: 'Tantolunden',
        lat: 59.312935, 
        lng: 18.047503,
        drink: 'Between 07-00'
    },
    {
        name: 'Skinnarviksparken',
        lat: 59.319673,
        lng: 18.048215,
        drink: 'Between 07-00'
    },
    {
        name: 'Vitabergsparken',
        lat: 59.311089,
        lng: 18.090116,
        drink: 'Between 07-00'
    },
    {
        name: 'Fåfängan',
        lat: 59.314877,
        lng: 18.102563,
        drink: 'Between 07-00'
    },
    {
        name: 'Åsöberget',
        lat: 59.314545,
        lng: 18.095574,
        drink: 'Between 07-00'
    },
    {
        name: 'Tantolunden',
        lat: 59.313038,
        lng: 18.046970,
        drink: 'Between 07-00'
    },
    {
        name: 'Kristinebergsparken',
        lat: 59.335224,
        lng: 18.005440,
        drink: 'Between 07-00'
    },
    {
        name: 'Rålambshovsparken',
        lat: 59.328128,
        lng: 18.024565,
        drink: 'Between 07-00'
    },
    {
        name: 'Kronobergsparken',
        lat: 59.331827,
        lng: 18.035358,
        drink: 'Between 07-00'
    },
    {
        name: 'Galärparken–Lejonparken',
        lat: 59.329245,
        lng: 18.090988,
        drink: 'Between 07-00'
    },
    //drink never
    {
        name: 'Mosebacke torg',
        lat: 59.317974,
        lng: 18.074383,
        drink: 'Never'
    },    
    {
        name: 'Sandbacksparken',
        lat: 59.316837,
        lng: 18.080256,
        drink: 'Never'
    },    
    {
        name: 'Stigbergsparken',
        lat: 59.315807,
        lng: 18.087153,
        drink: 'Never'
    },
    {
        name: 'Tengdahlsparken',
        lat: 59.311139, 
        lng: 18.093750,
        drink: 'Never'
    },
    {
        name: 'Axel Landquists park',
        lat: 59.313974, 
        lng: 18.080759,
        drink: 'Never'
    },
    {
        name: 'Droskan',
        lat: 59.315278,
        lng: 18.079073,
        drink: 'Never'
    },
    {
        name: 'Björns trädgård',
        lat: 59.315180, 
        lng: 18.074029,
        drink: 'Never'
    },
    {
        name: 'Nytorget',
        lat: 59.312152, 
        lng: 18.083321,
        drink: 'Never'
    },
    {
        name: 'Tullgårdsparken',
        lat: 59.306285, 
        lng: 18.082675,
        drink: 'Never'
    },
    {
        name: 'Fatbursparken',
        lat: 59.314187, 
        lng: 18.068415,
        drink: 'Never'
    },
    {
        name: 'Runt polishuset på Torkel Knutssonsgatan/Rosenlundsgatan',
        lat: 59.315948, 
        lng: 18.058712,
        drink: 'Never'
    },
    {
        name: 'Tjurbergsparken',
        lat: 59.308409, 
        lng: 18.071394,
        drink: 'Never'
    },
    {
        name: 'Sankt Göransparken',
        lat: 59.334944,
        lng: 18.024328,
        drink: 'Never'
    },
    {
        name: 'Kungsholmstorg',
        lat: 59.327696, 
        lng: 18.042473,
        drink: 'Never'
    },
    {
        name: 'Serafimerstranden',
        lat: 59.328507, 
        lng: 18.055126,
        drink: 'Never'
    },
    {
        name: 'Blekholmsstranden',
        lat: 59.330975, 
        lng: 18.051741,
        drink: 'Never'
    },
    {
        name: 'Norra bantorget',
        lat: 59.334895, 
        lng: 18.054516,
        drink: 'Never'
    },
    {
        name: 'Dammen vid Observatorielunden',
        lat: 59.342723, 
        lng: 18.056038,
        drink: 'Never'
    },
    {
        name: 'Monica Zetterlunds Park',
        lat: 59.346313, 
        lng: 18.060520,
        drink: 'Never'
    },
    {
        name: 'Brunnsviks strandbad',
        lat: 59.362205,
        lng: 18.048582,
        drink: 'Never'
    }
]

