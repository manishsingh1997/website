/* eslint-disable */

/**
 * Returns URL slug.
 * @param {string} str
 */
function slugify(str) {
  return str.toLocaleLowerCase().replace(/[\s|.|,|\\|/|%|']/g, '-');
}

export const FencePhotoData = [
  {
    categoryName: 'Picture Frame',
    categorySlug: slugify('Picture Frame'),
    categoryGroups: [
      {
        groupName: 'Without Lattice',
        groupSlug: slugify('Without Lattice'),
        groupPhotos: [
          {
            caption: 'Picture Frame Side by Side Stepped Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/pf+sbs+2.jpg',
            slug: slugify('Picture Frame Side by Side Stepped Top'),
          },
          {
            caption: 'Picture Frame Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/PF+sbs.jpeg',
            slug: slugify('Picture Frame Side by Side'),
          },
          {
            caption: 'Picture Frame Louvered with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/pf+louvered.png',
            slug: slugify('Picture Frame Louvered with Kickboard 1'),
          },
          {
            caption: 'Picture Frame Louvered with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/pf+louvered+3.png',
            slug: slugify('Picture Frame Louvered with Kickboard 2'),
          },
          {
            caption: 'Vallejo, CA - Picture Frame Board on Board with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc086dd9e1f671c728112fe_vallejo%2520picture%2520frame.jpg',
            slug: 'vallejo-ca-picture-frame-flat-top-with-kickboard',
          },
          {
            caption: "Palo Alto, CA - Picture Frame Board on Board with an integrated 3' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc085e10a5c75c28bbabb01_paloalto%2520pictureframe%2520stepped.jpg',
            slug: 'palo-alto-ca-picture-frame-board-on-board-with-an-integrated-3-retaining-wall',
          },
          {
            caption: 'Pleasanton, CA - Picture Frame Board on Board, Flat Top on Concrete Retaining Wall',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61e57becd0150b0107494c_picture%2520frame%2520concrete%2520retaining%2520wall.jpg',
            slug: 'pleasanton-ca-picture-frame-board-on-board-flat-top-on-concrete-retaining-wall',
          },
          {
            caption: 'Berkeley, CA - Picture Frame Side by Side with 1" gap, Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e07a7364f641708f5375c_picture%2520frame%2520flat%2520top%2520side%2520gap%2520between%2520pickets.jpg',
            slug: 'berkeley-ca-picture-frame-side-by-side-with-1-gap-flat-top',
          },
          {
            caption: 'American Canyon, CA - Picture Frame Board on Board, Flat Top with Side Trim',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e068532efce2920608182_picture%2520frame%2520flat%2520top%2520side%2520trim.jpg',
            slug: 'american-canyon-ca-picture-frame-board-on-board-flat-top-with-size-trim',
          },
          {
            caption: 'Sacramento, CA - Picture Frame Board on Board, Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e05712f64c67364650967_picture%2520frame%2520flat%2520top%25203.jpg',
            slug: 'sacramento-ca-picture-frame-board-on-board-flat-top',
          },
          {
            caption: 'Albany, CA - Picture Frame Board on Board, Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e03d18d94f53b1769ea82_picture%2520frame%2520flat%2520top.jpg',
            slug: 'albany-ca-picture-frame-board-on-board-with-flat-top',
          },
          {
            caption: "Woodside, CA - Picture Frame Board on Board with an integrated 3' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2530874fdbbaf99bbf2625_retaining%2520wall%2520fence6.jpg',
            slug: 'woodside-ca-picture-frame-board-on-board-with-an-integrated-3-retaining-wall',
          },
          {
            caption: "Morgan Hill, CA - Picture Frame Board on Board with an integrated 1' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2530164fdbba8288bf2532_retaining%2520wall%2520fence5.jpg',
            slug: 'morgan-hill-ca-picture-frame-with-1-x1-s-top-and-bottom-board-on-board-with-an-integrated-1-retaining-wall',
          },
        ],
      },
      {
        groupName: 'With Lattice',
        groupSlug: slugify('With Lattice'),
        groupPhotos: [
          {
            caption: 'Picture Frame Board on Board with Square Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Alameda+California+-+Picture+Frame+with+Lattice+2.jpg',
            slug: slugify('Picture Frame Board on Board with Square Lattice'),
          },
          {
            caption: 'Picture Frame Board on Board with Piano Key Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland+California+-+Picture+Frame+with+Lattice+1.jpg',
            slug: slugify('Picture Frame Board on Board with Piano Key Lattice'),
          },
          {
            caption: 'Picture Frame Side by Side with Diagonal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+with+lattice.jpeg',
            slug: slugify('Picture Frame Side by Side with Diagonal Lattice'),
          },
          {
            caption: "Carmichael, CA - Picture Frame Board on Board with 1' Diagonal Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc087e80a5c75fa2cbacd6c_carmichael%2520picture%2520frame%2520with%2520lattice.jpg',
            slug: 'carmichael-ca-picture-frame-board-on-board-with-1-diagonal-lattice',
          },
          {
            caption: "San Jose, CA - Picture Frame Board on Board with 1' Diagonal Privacy Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc0873ffc13edd1239e104b_sanjose%2520pictureframe%2520lattice.jpg',
            slug: 'san-jose-ca-picture-frame-board-on-board-with-1-diagonal-privacy-lattice',
          },
          {
            caption: "Alameda, CA - Picture Frame Board on Board with 1' Piano Key Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc085789e1f676064810a4a_Alameda%2520picture%2520frame%2520piano%2520key%2520lattice.jpg',
            slug: 'alameda-ca-picture-frame-board-on-board-with-1-piano-key-lattice',
          },
          {
            caption: "Davis, CA - Picture Frame Side by Side with 1' Square Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c925c561aaad749775d0512_picture%2520frame%2520piano%2520key%2520lattice.jpg',
            slug: 'davis-ca-picture-frame-side-by-side-with-1-square-lattice',
          },
          {
            caption: "San Ramon, CA - Picture Frame Board on Board, with 1' Diagonal Privacy Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61e96be16336c598d58377_San%2520Ramon_PictureFramewithLatticeprivacy.jpg',
            slug: 'san-ramon-ca-picture-frame-board-on-board-with-1-privacy-diagonal-lattice',
          },
          {
            caption: "Sacramento, CA - Picture Frame Board on Board, Flat Top with 1' Diagonal Lattice and Kick Board",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61e779b0970073a9fe8fd5_Sacramento_PictureFramewithLattice.jpg',
            slug: 'sacramento-ca-picture-frame-board-on-board-flat-top-with-1-diagonal-lattice-and-kick-board',
          },
          {
            caption:
              "Alameda, CA - Picture Frame Board on Board with 1' Diagonal Privacy Lattice on Reinforced Concrete Block Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e09718d94f56df769fc38_Alameda_KanekaEinoriTsurutaPictureFrameWithoutLattice_3.JPG',
            slug: 'alameda-ca-picture-frame-board-on-board-with-1-diagonal-privacy-lattice-on-reinforced-concrete-block-retaining-wall',
          },
          {
            caption: "San Jose, CA -  Picture Frame Louvered Fence, with 1' Diagonal Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5e081d2f64c6bdae650c96_picture%2520frame%2520with%2520lattice%2520louvre.jpg',
            slug: 'san-jose-ca-picture-frame-louvered-fence-with-1-diagonal-lattice',
          },
          {
            caption: "Oakland, CA - Picture Frame Board on Board with 1' Diagonal Privacy Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c5dfc1a32efce43ff606dde_picture%2520frame%2520lattice%25203.jpg',
            slug: 'sunnyvale-ca-picture-frame-board-on-board-with-1-diagonal-privacy-lattice',
          },
          {
            caption:
              " Belmont, CA - Picture Frame Board on Board with Diagonal Lattice and an integrated 3' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c252f3a1110ec1a4cffd9e3_retaining%2520wall%2520fence2.jpg',
            slug: 'belmont-ca-picture-frame-board-on-board-with-diagonal-lattice-and-an-integrated-3-retaining-wall',
          },
          {
            caption:
              "San Jose, CA -  Picture Frame Board on Board with Diagonal Lattice and an integrated 1' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c252ee035af3a6ba7da7249_retaining%2520wall%2520fence3.jpg',
            slug: 'san-jose-ca-picture-frame-board-on-board-with-diagonal-lattice-and-an-integrated-1-retaining-wall',
          },
        ],
      },
      {
        groupName: 'Short Fence',
        groupSlug: slugify('Short Fence'),
        groupPhotos: [
          {
            caption: 'Picture Frame Board on Board with Diagonal Privacy Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/picture+frame+with+privacy+lattice.jpg',
            slug: slugify('Picture Frame Board on Board with Diagonal Privacy Lattice'),
          },
          {
            caption: 'Picture Frame Board on Board with Diagonal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/picture+frame+with+lattice.jpg',
            slug: slugify('Picture Frame Board on Board with Diagonal Lattice 1'),
          },
          {
            caption: 'Picture Frame Board on Board with Diagonal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/picture+frame+with+lattice+1.jpg',
            slug: slugify('Picture Frame Board on Board with Diagonal Lattice 2'),
          },
          {
            caption: 'Picture Frame Side by Side with Gaps with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/picture+frame+with+gaps+.png',
            slug: slugify('Picture Frame Side by Side with Gaps with Kickboard'),
          },
          {
            caption: 'Picture Frame Board on Board',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/picture+frame+short.jpg',
            slug: slugify('Picture Frame Board on Board'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Nail Up',
    categorySlug: slugify('Nail Up'),
    categoryGroups: [
      {
        groupName: 'Dog Ear',
        groupSlug: slugify('Dog Ear'),
        groupPhotos: [
          {
            caption: 'Nail Up Dog Ear Side by Side with Metal Post',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+metal+post.png',
            slug: slugify('Nail Up Dog Ear Side by Side with Metal Post 1'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side with Metal Post',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+Dog+metal+post.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side with Metal Post 2'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side with Redwood Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+dog+ear+RCH+kickboard.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side with Redwood Kickboard'),
          },
          {
            caption: 'Nail Up Dog Ear Louvered',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nu+dog+ear+louvered.jpg',
            slug: slugify('Nail Up Dog Ear Louvered'),
          },
          {
            caption: 'Oakland, CA - Nail Up Side by Side Dog Ear with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc08537d2c730e050b0921b_oakland%2520dogear%2520stepped.jpg',
            slug: 'oakland-ca-nail-up-side-by-side-dog-ear-with-kickboard',
          },
          {
            caption: 'Loomis, CA - Nail Up Side by Side Dog Ear with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc08504d2c7308d9eb091c7_loomis%2520dogear.jpg',
            slug: 'loomis-ca-nail-up-side-by-side-dog-ear-with-kickboard',
          },
          {
            caption: 'Fairfield, CA - Nail Up Side by Side Dog Ear with 2 Rails (Backside)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc08464f9312f71053bc1d4_fairfield%2520dogear%2520double%2520rail.jpg',
            slug: 'fairfield-ca-nail-up-board-on-board-dog-ear-with-2-rails-backside',
          },
          {
            caption: 'Sacramento, CA - Nail Up Side by Side Dog Ear with Alternating Panels (aka Good Neighbor)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc084119e1f677be380f364_sac%2520nailup%2520dogear%2520alternating.jpg',
            slug: 'sacramento-ca-nail-up-board-on-board-dog-ear-with-alternating-panels-aka-good-neighbor',
          },
          {
            caption: 'Orangevale, CA - Nail Up Side by Side Dog Ear with Alternating Panels',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61f6b99ea620b4c07c0547_orangevale%2520nail%2520up%2520board%2520on%2520board%2520dog%2520ear%2520with%2520alternating%2520panel.jpg',
            slug: 'orangevale-ca-nail-up-side-by-side-dog-ear-with-alternating-panels',
          },
          {
            caption: 'Lodi, CA - Nail Up Board on Board Dog Ear with Alternating Panels (aka Good Neighbor)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61f67d9ea6201ecf7c04e4_lodi%2520nail%2520up%2520board%2520on%2520board%2520dog%2520ear%2520with%2520alternating%2520panels.jpg',
            slug: 'lodi-ca-nail-up-board-on-board-dog-ear-with-alternating-panels-aka-good-neighbor',
          },
          {
            caption: 'Stockton, CA - Nail Up Board on Board Dog Ear with 3 Rails (Backside)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61f442e163361f56d5abbb_stockton%2520nail%2520up%2520board%2520on%2520board%2520with%25203%2520rails.jpg',
            slug: 'stockton-ca-nail-up-board-on-board-dog-ear-with-3-rails-backside',
          },
          {
            caption: 'Orangevale, CA - Nail Up Side by Side Dog Ear with 2 Rails (Backside) ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61f24842c9557e07e7f9fc_orangevale%2520nail%2520up%2520dog%2520ear%2520with%25202%2520rails.jpg',
            slug: 'orangevale-ca-nail-up-side-by-side-dog-ear-with-2-rails-backside',
          },
          {
            caption: "Loomis, CA - Nail Up Side by Side Dog Ear with Integrated 2' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61f12ce1633609e2d5a1af_Loomis%2520nail%2520up%2520dog%2520ear%2520with%2520retaining%2520wall.jpg',
            slug: 'loomis-ca-nail-up-side-by-side-dog-ear-with-integrated-2-retaining-wall',
          },
          {
            caption: 'Dublin, CA - Nail Up Side by Side Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61ef6db097003031fea016_dublin%2520nailup%2520dog%2520ear%2520no%2520kickboard.jpg',
            slug: 'dublin-ca-nail-up-side-by-side-dog-ear',
          },
          {
            caption: 'Stockton, CA - Nail Up Side by Side Dog Ear with 8" Kick Board',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61ee56e163363805d59a79_Stockton%2520nailup%2520dog%2520ear%2520with%2520kickboard.jpg',
            slug: 'stockton-ca-nail-up-side-by-side-dog-ear-with-8-kick-board',
          },
          {
            caption: 'Union City, CA - Nail Up Board on Board, Dog Ear, 2 Rails (Backside)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61e4bc9e21d82fbba0d197_nailup%2520dog%2520ear%25202%2520rails.jpg',
            slug: 'nail-up-board-on-board-dog-ear-2-rails-backside',
          },
          {
            caption:
              "Oakland, CA - Nail Up Side by Side Dog Ear with 3 rails, and Nail Up Side by Side Dog Ear with an Integrated 3' Tall Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2531614fdbbacb18bf288a_retaining%2520wall%2520fence7.jpg',
            slug: 'oakland-ca-nail-up-side-by-side-dog-ear-with-3-rails-and-nail-up-side-by-side-dog-ear-with-an-integrated-3-tall-retaining-wall',
          },
          {
            caption: "Roseville, CA - Nail Up Side by Side, Dog Ear with an integrated 3' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c252fb39a1575ee0185dcf6_retaining%2520wall%2520fence4.jpg',
            slug: 'roseville-ca-nail-up-side-by-side-dog-ear-with-an-integrated-3-retaining-wall',
          },
        ],
      },
      {
        groupName: 'Flat Top',
        groupSlug: slugify('Flat Top'),
        groupPhotos: [
          {
            caption: 'Nail Up Flat Top Louvered',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+louvered.png',
            slug: slugify('Nail Up Flat Top Louvered'),
          },
          {
            caption: 'Nail Up Flat Top Side by Side with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+with+kickboard.png',
            slug: slugify('Nail Up Flat Top Side by Side with Kickboard'),
          },
          {
            caption: 'Nail Up Flat Top Board on Board with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+sbs+with+kickboard.png',
            slug: slugify('Nail Up Flat Top Board on Board with Kickboard'),
          },
          {
            caption: 'Nail Up Flat Top Side by Side Alternating Panels with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/NU+alternating+retaining+wall.png',
            slug: slugify('Nail Up Flat Top Side by Side Alternating Panels with Kickboard'),
          },
          {
            caption: 'Livermore, CA - Nail Up Board on Board Flat Top with Alternating Panels (aka Good Neighbor)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620823a928ab526841dfc9_livermore%2520nail%2520up%2520board%2520on%2520board%2520alternating%2520panel.jpg',
            slug: 'livermore-ca-nail-up-board-on-board-flat-top-with-alternating-panels-aka-good-neighbor',
          },
          {
            caption: 'Woodside CA - Nail Up Side by Side Flat Top with Alternating Panels (aka Good Neighbor)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620724a928ab495541de45_woodside%2520nail%2520up%2520side%2520by%2520side%2520alternating%2520panels.jpg',
            slug: 'woodside-ca-nail-up-side-by-side-flat-top-with-alternating-panels-aka-good-neighbor',
          },
          {
            caption: 'Livermore, CA- Nail Up Board on Board Flat Top with 3 Rails (Backside)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620626a928abfa3241dd22_livermore%2520nail%2520up%2520board%2520on%2520board%25203%2520rails.jpg',
            slug: 'livermore-ca-nail-up-board-on-board-flat-top-with-3-rails-backside',
          },
          {
            caption: 'Livermore, CA - Nail Up Board on Board Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c6205e65e0efd6115398aaf_livermore%2520nail%2520up%2520board%2520on%2520board.jpg',
            slug: 'livermore-ca-nail-up-board-on-board-flat-top',
          },
          {
            caption: 'Oakland, CA - Nail Up Side by Side Flat Top on Concrete Retaining Wall with 2 Rails (Backside)',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620488b51ea0b7fb031168_oakland%2520nailupside%2520by%2520side%2520flat%2520top%2520on%2520concrete%2520retaining%2520wall.jpg',
            slug: 'oakland-ca-nail-up-side-by-side-flat-top-on-concrete-retaining-wall-with-2-rails-backside',
          },
          {
            caption: "Concord CA - Nail Up Side by Side Flat Top with an Integrated 1' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620206a928abf00a41d71b_concord%2520nail%2520up%2520side%2520by%2520side%2520flat%2520top%25201%2527%2520retaining%2520walla.jpg',
            slug: 'concord-ca-nail-up-side-by-side-flat-top-with-an-integrated-1-retaining-wall',
          },
          {
            caption: 'Woodland, CA - Nail Up Side by Side Flat Top with 2"x 6" Cap Rail',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c620104b51ea09e630304a2_woodland%2520nail%2520up%2520side%2520by%2520side%2520with%25202%2522x6%2522%2520Cap%2520Rail.jpg',
            slug: 'woodland-ca-nail-up-side-by-side-flat-top-with-2-x-6-cap-rail',
          },
          {
            caption: 'Hayward, CA - Nail Up Side by Side Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c6200deb51ea008d60303d9_Hayward%2520nail%2520up%2520side%2520by%2520side%2520flat%2520top.jpg',
            slug: 'hayward-ca-nail-up-side-by-side-flat-top',
          },
          {
            caption: 'San Carlos, CA - Nail Up Side by Side Flat Top with 12" Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c61fe15c8dd8b100d8425fc_San%2520Carlos%2520nail%2520up%2520side%2520by%2520side%2520flat%2520top%2520with%2520kickboard.jpg',
            slug: 'san-carlos-ca-nail-up-side-by-side-flat-top-with-12-kickboard',
          },
        ],
      },
      {
        groupName: 'Short Fence',
        groupSlug: slugify('Short Fence'),
        groupPhotos: [
          {
            caption: 'Nail Up Dog Ear Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Richmond+California+-+Nail+Up+Dog+Ear+4.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side 1'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Sacramento+California+-+Nail+Up+Dog+Ear+2.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side 2'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Sacramento+California+-+Nail+Up+Dog+Ear+1.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side with Gaps'),
          },
          {
            caption: 'Nail Up Flat Top Side by Side with Cap Rail',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nailup+sbs+back+side.jpg',
            slug: slugify('Nail Up Flat Top Side by Side with Cap Rail'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nailup+horizontal+back.jpg',
            slug: slugify('Nail Up Horizontal Side by Side 1'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nailup+horizontal+1.jpg',
            slug: slugify('Nail Up Horizontal Side by Side 2'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nailup+dog+ear+with+gaps+1.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side with Gaps 1'),
          },
          {
            caption: 'Nail Up Dog Ear Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/nail+up+dog+ear+with+gaps.jpg',
            slug: slugify('Nail Up Dog Ear Side by Side with Gaps 2'),
          },
        ],
      },
      {
        groupName: 'With Lattice',
        groupSlug: slugify('With Lattice'),
        groupPhotos: [
          {
            caption: 'Nail Up Flat Top Side by Side with Diagonal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-Sacramento+California+-+Nail+Up+Flat+Top+4.jpg.jpg',
            slug: slugify('Nail Up Flat Top Side by Side with Diagonal Lattice'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Horizontal',
    categorySlug: slugify('Horizontal'),
    categoryGroups: [
      {
        groupName: 'Nail Up',
        groupSlug: slugify('Nail Up'),
        groupPhotos: [
          {
            caption: 'Nail Up Horizontal Side by Side with Gaps and Stepped Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Stanford+California+-+Horizontal+4.jpg',
            slug: slugify('Nail Up Horizontal Side by Side with Gaps and Stepped Top 1'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side with Gaps and Stepped Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Montara++California+-+Nail+up+Horizontal++7.jpg',
            slug: slugify('Nail Up Horizontal Side by Side with Gaps and Stepped Top 2'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side Stepped Top with Integrated Retaining Wall',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland+California+-+Nail+Up+Horizontal+Flat+Top+5.jpeg',
            slug: slugify('Nail Up Horizontal Side by Side Stepped Top with Integrated Retaining Wall'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side Over Retaining Wall',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland+California+-+Nail+Up+Horizontal+Flat+Top+2.jpeg',
            slug: slugify('Nail Up Horizontal Side by Side Over Retaining Wall'),
          },
          {
            caption: 'Sacramento, CA - Nail Up Horizontal Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc0940df91e8b79aa8e7490_sacramental%2520horizontal.jpg',
            slug: 'sacramento-ca-nail-up-horizontal-flat-top',
          },
          {
            caption: 'Santa Rosa, CA Nail Up Horizontal Shadow Box',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5cc0931dad680ba6d7711e91_napa%2520horizontal%2520shadowbox.jpg',
            slug: 'santa-rosa-ca-nail-up-shadow-box-horizontal-fence',
          },
          {
            caption: 'Oakland, CA - Nail Up Horizontal Flat Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c6dc9820bcf6e667b511abb_Oakland%2520Nailup%2520Horizontal.jpg',
            slug: 'oakland-ca-nail-up-horizontal-flat-top',
          },
          {
            caption: "San Mateo, CA -  Nail Up Horizontal with a Finished Height of 4'",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2516ae4fdbba8001bf09e0_Ergeon%2520horizontal%2520fence3.jpg',
            slug: 'san-mateo-ca-nail-up-horizontal-with-a-finished-height-of-4',
          },
          {
            caption: 'San Mateo, CA - Nail Up Horizontal with Horizontal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2516509a15752a9785af13_Ergeon%2520horizontal%2520fence4.jpg',
            slug: 'san-mateo-ca-nail-up-horizontal-with-horizontal-lattice',
          },
          {
            caption: "Oakland, CA - Nail Up Horizontal with an Integrated 2' Retaining Wall",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2513283c78e5053e8d26a6_Ergeon%2520horizontal%2520fence.jpg',
            slug: 'nail-up-horizontal-flat-top-with-an-integrated-2-retaining-wall',
          },
          {
            caption: 'Oakland, CA - Nail Up Horizontal with 2" gaps on a Concrete Retaining Wall',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2514d435af3a1588da46f1_Ergeon%2520horizontal%2520fence5.jpg',
            slug: 'horizontal-fence-2',
          },
          {
            caption: 'Oakland, CA - Nail Up Horizontal ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c2514e79a157519f185acb0_Ergeon%2520horizontal%2520fence2.jpg',
            slug: 'horizontal-fence',
          },
          {
            caption: 'Sunnyvale, CA - Wood Retaining Wall',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5c252e174fdbba6522bf23e6_retaining%2520wall%2520fence.jpg',
            slug: 'sunnyvale-ca-wood-retaining-wall',
          },
        ],
      },
      {
        groupName: 'Picture Frame',
        groupSlug: slugify('Picture Frame'),
        groupPhotos: [
          {
            caption: 'Picture Frame Horizontal Side by Side with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+El+Sobrante%2C+California+-+Horizontal+1.jpeg',
            slug: slugify('Picture Frame Horizontal Side by Side with Kickboard'),
          },
          {
            caption: 'Picture Frame Horizontal Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/pf+horizontal+3.png',
            slug: slugify('Picture Frame Horizontal Side by Side'),
          },
          {
            caption: 'Picture Frame Horizontal Side by Side Stepped Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland+California+-+Horizontal+3.jpg',
            slug: slugify('Picture Frame Horizontal Side by Side Stepped Top'),
          },
          {
            caption: 'Picture Frame Horizontal Side by Side Stepped Top with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/pf+horizontal+.jpg',
            slug: slugify('Picture Frame Horizontal Side by Side Stepped Top with Kickboard'),
          },
        ],
      },
      {
        groupName: 'With Lattice',
        groupSlug: slugify('With Lattice'),
        groupPhotos: [
          {
            caption: 'Picture Frame Horizontal Side by Side with Horizontal Lattice and Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland+California+-+Horizontal+2.jpg',
            slug: slugify('Picture Frame Horizontal Side by Side with Horizontal Lattice and Kickboard'),
          },
          {
            caption: 'Picture Frame Horizontal Side by Side with Square Lattice and Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/PF+horiztonal+with+lattice.jpeg',
            slug: slugify('Picture Frame Horizontal Side by Side with Square Lattice and Kickboard'),
          },
          {
            caption: 'Nail Up Horizontal Side by Side with Horizontal Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Napa++California+-+Horizontal+1.jpeg',
            slug: slugify('Nail Up Horizontal Side by Side with Horizontal Lattice'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Chain Link',
    categorySlug: slugify('Chain Link'),
    categoryPhotos: [
      {
        caption: 'Chain Link Privacy Fence',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Rod+Williamson+1.jpg',
        slug: slugify('Chain Link Privacy Fence'),
      },
      {
        caption: 'Chain Link Fence',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Modesto+California+-+Galvanized+Fabric+1+.jpg',
        slug: slugify('Chain Link Fence'),
      },
      {
        caption: 'Vinyl Covered Chain Link',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Bay+PointCalifornia+-+Chain+LInk+4.jpg',
        slug: slugify('Vinyl Covered Chain Link'),
      },
      {
        caption: 'Chain Link with Barbed Wire',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Sacramento+California+-+Gauge+2.jpg',
        slug: slugify('Chain Link with Barbed Wire'),
      },
    ],
  },
  {
    categoryName: 'Boxed Frame',
    categorySlug: slugify('Boxed Frame'),
    categoryPhotos: [
      {
        caption: 'Boxed Wire Fence 2 rails with Kick board 6ga wire',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Image+from+iOS+(4).jpg',
        slug: slugify('Boxed Wire Fence 2 rails with Kick board 6ga wire'),
      },
      {
        caption: 'Boxed WireFence 2 rails w/ Cap Rail 6ga wire',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/attachment-2.jpeg',
        slug: slugify('Boxed WireFence 2 rails w/ Cap Rail 6ga wire'),
      },
      {
        caption: 'Picture Frame Board on Board with wire lattice 14 ga',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Brandi+Yaeger+back+fence+4.jpeg',
        slug: slugify('Picture Frame Board on Board with wire lattice 14 ga'),
      },
    ],
  },
  {
    categoryName: 'Staining',
    categorySlug: slugify('Staining'),
    categoryGroups: [
      {
        groupName: 'Transparent',
        groupSlug: slugify('Transparent'),
        groupPhotos: [
          {
            caption: 'Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Semi-trans+stain+2.jpg',
            slug: slugify('Transparent Wood Fence Stain 1'),
          },
          {
            caption: 'Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/trans+1.jpg',
            slug: slugify('Transparent Wood Fence Stain 2'),
          },
          {
            caption: 'Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Stain+%26+Seal+Fence+-+Ergeon+-+Richmond+Californiac1.jpeg',
            slug: slugify('Transparent Wood Fence Stain 3'),
          },
        ],
      },
      {
        groupName: 'Semi Transparent',
        groupSlug: slugify('Semi Transparent'),
        groupPhotos: [
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Berkley%2C+California+-+Staining+3.jpeg',
            slug: slugify('Semi Transparent Wood Fence Stain 1'),
          },
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Alameda%2C+California+-+Stain+and+Seal+7.jpeg',
            slug: slugify('Semi Transparent Wood Fence Stain 2'),
          },
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Danville+California+-+Picture+Frame+2.jpeg',
            slug: slugify('Semi Transparent Wood Fence Stain 3'),
          },
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Castro+Valley%2C+California+-+Stain+and+Seal+4.jpeg',
            slug: slugify('Semi Transparent Wood Fence Stain 4'),
          },
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Semi-trans+stain.jpg',
            slug: slugify('Semi Transparent Wood Fence Stain 5'),
          },
          {
            caption: 'Semi Transparent Wood Fence Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Semi-trans+stain+1.jpg',
            slug: slugify('Semi Transparent Wood Fence Stain 6'),
          },
        ],
      },
      {
        groupName: 'Solid',
        groupSlug: slugify('Solid'),
        groupPhotos: [
          {
            caption: 'Solid Wood Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Stain+%26+Seal+Fence+-+Ergeon+-+Alameda+California+5.jpg',
            slug: slugify('Solid Wood Stain 1'),
          },
          {
            caption: 'Solid Wood Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Danville_GeoffreyDohrmanPictureFrameWithoutLattice_16.jpg',
            slug: slugify('Solid Wood Stain 2'),
          },
          {
            caption: 'Solid Wood Stain',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/stain+solid.jpg',
            slug: slugify('Solid Wood Stain 3'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Lumber',
    categorySlug: slugify('Lumber'),
    categoryPhotos: [
      {
        caption: 'Redwood Con Heart Nail Up Flat Top Side by Side ',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Rocklin%2C+California+-+Nail+Up+Flat+Top.jpeg',
        slug: slugify('Redwood Con Heart Nail Up Flat Top Side by Side '),
      },
      {
        caption: 'Redwood Con Heart Picture Frame Board on Board with Privacy Lattice',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+San+Jose%2C+California+-+Picture+Frame+with+Lattice+1+.jpg',
        slug: slugify('Redwood Con Heart Picture Frame Board on Board with Privacy Lattice'),
      },
      {
        caption: 'Redwood Con Heart Picture Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland++California+-+Picture+Frame+1.jpg',
        slug: slugify('Redwood Con Heart Picture Frame Board on Board'),
      },
      {
        caption: 'Redwood Con Heart Nail Up Horizontal Side by Side',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/Gate+Installation+-+Ergeon+-+Berkeley+California+-+Single+Gate+2.jpeg',
        slug: slugify('Redwood Con Heart Nail Up Horizontal Side by Side'),
      },
      {
        caption: 'Redwood Con Common Nail Up Dog Ear with Kickboard',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Oakland%2C+California+-+Nail+Up+Dog+Ear.jpeg',
        slug: slugify('Redwood Con Common Nail Up Dog Ear with Kickboard'),
      },
      {
        caption: 'Redwood Con Common Picture Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/Redwood+Con+Common+Picture+Frame+Board+on+Board.png',
        slug: slugify('Redwood Con Common Picture Frame Board on Board'),
      },
      {
        caption: 'Redwood Con Common Picture Frame with Lattice',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+San+Leandro%2C+California+-+Picture+Frame+with+Lattice+1.jpeg',
        slug: slugify('Redwood Con Common Picture Frame with Lattice'),
      },
      {
        caption: 'Redwood Con Common Horizontal',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/Fence+Installation+-+Ergeon+-+Stanford+California+-+Horizontal+4.jpeg',
        slug: slugify('Redwood Con Common Horizontal'),
      },
    ],
  },
  {
    categoryName: 'Before & After',
    categorySlug: 'before-after',
    categoryPhotos: [
      {
        caption: 'San Jose, CA - Picture Frame with Lattice',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5bdbaff525c74a3970288409_GinoVo%2520Before%2520After.jpg',
        slug: 'san-jose-ca-picture-frame-with-lattice-6',
      },
      {
        caption: 'Vallejo, CA - Picture Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5bdbaeb589ab76ee9206ff3d_RobertBowder%2520Before%2520After.jpg',
        slug: 'vallejo-ca-picture-frame-board-on-board-ba',
      },
      {
        caption: 'Saratoga, CA - Nail Up Side by Side',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5bd8e19ecae4a87f8d056d26_BA_Nail%2520Up%2520Side%2520by%2520Side.png',
        slug: 'saratoga-ca-nail-up-side-by-side-ba',
      },
      {
        caption: 'Milpitas, CA - Picture Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5bdbaef356cc623130689b7c_GaryCollett%2520Before%2520After.jpg',
        slug: 'cupiditate-quod-qui-placeat',
      },
      {
        caption: 'Sacramento, CA - Picture Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/fence/5bd8cf39e5df0e3f6ec6b74f_Charles%2520Seielstad_BA.png',
        slug: 'sacramento-ca-picture-frame-board-on-board5',
      },
    ],
  },
  {
    categoryName: 'Vinyl',
    categorySlug: slugify('Vinyl'),
    categoryPhotos: [
      {
        caption: '6’ Privacy White Vinyl Fence',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/%5BPrivacy+-+White%5D+%5BRick+M.%5D+%5B2021%5D2.jpg',
        slug: slugify('6’ Privacy White Vinyl Fence'),
      },
      {
        caption: '4’ Privacy White Vinyl Fence',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/%5BPrivacy+-+White%5D+%5BLaura+T.%5D+%5B2021%5D2.jpeg',
        slug: slugify('4’ Privacy White Vinyl Fence'),
      },
      {
        caption: '6’ Privacy White Vinyl Fence with Slope',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/6+Ft+White+Vinyl+Privacy+Fence+with+Slope.jpeg',
        slug: slugify('6’ Privacy White Vinyl Fence with Slope'),
      },
      {
        caption: '6’ to 4’ Stepped White Vinyl Fence',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/Stepped+White+Vinyl+Privacy+Fence.jpeg',
        slug: slugify('6’ to 4’ Stepped White Vinyl Fence'),
      },
      {
        caption: '7’ Privacy White Vinyl Fence',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/7+Ft+Privacy+White+Vinyl+Fence.jpg',
        slug: slugify('7’ Privacy White Vinyl Fence'),
      },
      {
        caption: '6’ Privacy Tan Vinyl Fence',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/%5BPrivacy+-+Tan%5D+%5BSylvia+M.%5D+%5B2021%5D1+%5B.jpeg',
        slug: slugify('6’ Privacy Tan Vinyl Fence'),
      },
      {
        caption: '6’ Privacy Tan Vinyl Fence with Slope',
        url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/fence/6+Ft+Privacy+Tan+Vinyl+Fence+with+Sloped+Top.jpg',
        slug: slugify('6’ Privacy Tan Vinyl Fence with Slope'),
      },
    ],
  },
];

export const GatePhotoData = [
  {
    categoryName: 'Single',
    categorySlug: slugify('Single'),
    categoryGroups: [
      {
        groupName: 'Z-frame',
        groupSlug: slugify('Z-frame'),
        groupPhotos: [
          {
            caption: 'Single Gate Z-frame Arched Top Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Alameda+California+-+Single+Gate+2.jpg',
            slug: slugify('Single Gate Z-frame Arched Top Side by Side'),
          },
          {
            caption: 'Single Gate Z-frame Arched Top Board on Board',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Alameda+California+-+Single+Gate+1.jpg',
            slug: slugify('Single Gate Z-frame Arched Top Board on Board'),
          },
          {
            caption: 'Single Gate Z-frame Board on Board with Diagonal lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Roseville+California+-+Single+Gate+1.jpg',
            slug: slugify('Single Gate Z-frame Board on Board with Diagonal lattice'),
          },
          {
            caption: 'Stockton, CA - Z-Frame Single Gate Nail Up with Arch Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12df4a002f30d8b5b93675_Ergeon%2520Gates11.jpg',
            slug: 'stockton-single-gate-with-wide-box-frame-and-arched-top',
          },
          {
            caption: 'San Jose, CA - Z-Frame Single Gate Nail Up Board on Board with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12df2a002f30edb9b9365f_Ergeon%2520Gates10.jpg',
            slug: 'san-jose-single-gate-with-wide-z-frame-flat-top-board-on-board',
          },
          {
            caption: 'Sacramento, CA - Z-Frame Single Gate Board on Board with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12dedae56dc8df56109748_Ergeon%2520Gates8.jpg',
            slug: 'sacramento-single-gate-with-wide-z-frame-flat-top-board-on-board',
          },
          {
            caption: 'Livermore, CA - Z-Frame Single Gate  Board on Board with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12deb4002f30883fb935e3_Ergeon%2520Gates7.jpg',
            slug: 'livermore-single-gate-with-wide-z-frame-flat-top-board-on-board-2',
          },
          {
            caption: 'Livermore, CA - Z-Frame Single Gate  Board on Board with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e1e9cc357a2f0241f053_Ergeon%2520Gates24.jpg',
            slug: 'livermore-single-gate-with-wide-z-frame-flat-top-board-on-board',
          },
          {
            caption: 'Berkeley, CA - Box-Frame Single Gate with Arch Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e13cb3a12c212719f947_Ergeon%2520Gates19.jpg',
            slug: 'berkeley-wide-z-frame-single-gate-with-arched-top',
          },
          {
            caption: 'San Jose, CA - Z-Frame Single Gate Nail Up Louvered with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12de6a448d4b580db6e4a8_Ergeon%2520Gates6.jpg',
            slug: 'aliquid-commodi-quasi-quam',
          },
          {
            caption: 'Dublin, CA - Z-Frame Single Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e295cc357a564c41f240_Ergeon%2520Gates28.jpg',
            slug: 'laboriosam-sunt',
          },
        ],
      },
      {
        groupName: 'Box Frame',
        groupSlug: slugify('Box Frame'),
        groupPhotos: [
          {
            caption: 'Single Gate Box Frame Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+San+Rafael+California+-+Single+Gate+2.jpg',
            slug: slugify('Single Gate Box Frame Side by Side with Gaps'),
          },
          {
            caption: 'Single Gate Box Frame Board on Board with Arched Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Granite+Bay%2C+California+-+Single+Gate+2.jpg',
            slug: slugify('Single Gate Box Frame Board on Board with Arched Top'),
          },
          {
            caption: 'Single Gate Metal Box Frame Side by Side with Piano Key Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/metal+frame+gate+.jpg',
            slug: slugify('Single Gate Metal Box Frame Side by Side with Piano Key Lattice'),
          },

          {
            caption: 'American Canyon, CA - Box Frame Single Gate Nail Up with Arch Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e198ae722d093e9cf2a6_Ergeon%2520Gates21.jpg',
            slug: 'american-canyon-picture-frame-wide-box-frame-single-gate-with-arch',
          },
          {
            caption: 'Oakland, CA - Box Frame Single Gate Nail Up with Arch',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12dd72002f30b164b93358_Ergeon%2520Gates3.jpg',
            slug: 'dolores-nam-nemo-perferendis',
          },
        ],
      },
      {
        groupName: 'Picture Frame',
        groupSlug: slugify('Picture Frame'),
        groupPhotos: [
          {
            caption: 'Single Gate Picture Frame Board on Board',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Fremont+California+-+Single+Gate+2.jpg',
            slug: slugify('Single Gate Picture Frame Board on Board 1'),
          },
          {
            caption: 'Single Gate Picture Frame Board on Board',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/PF+gate+single.jpg',
            slug: slugify('Single Gate Picture Frame Board on Board 2'),
          },
          {
            caption: 'Single Gate Picture Frame Board on Board with Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Martinez%2C+California+-+Single+Gate.jpeg',
            slug: slugify('Single Gate Picture Frame Board on Board with Kickboard'),
          },
          {
            caption: 'Single Gate Picture Frame Board on Board with Privacy Lattice and Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Brekeley+California+-+Single+Gate+9.jpeg',
            slug: slugify('Single Gate Picture Frame Board on Board with Privacy Lattice and Kickboard'),
          },
          {
            caption: 'Oakland, Picture Frame Single Gate with Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e22bb0a0f2e34580a737_Ergeon%2520Gates26.jpg',
            slug: 'quia-dicta-ut-praesentium',
          },
        ],
      },
      {
        groupName: 'Horizontal',
        groupSlug: slugify('Horizontal'),
        groupPhotos: [
          {
            caption: 'Single Gate Horizontal Side by Side with Gaps and Piano Key Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Martinez%2C+California+-+Horizontal+1.jpeg',
            slug: slugify('Single Gate Horizontal Side by Side with Gaps and Piano Key Lattice'),
          },
          {
            caption: 'Single Gate Horizontal Side by Side with Gaps ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Berkeley+California+-+Horizontal+2.jpeg',
            slug: slugify('Single Gate Horizontal Side by Side with Gaps'),
          },
          {
            caption: 'Oakland, CA - Horizontal gate with 1" gap',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5cc095dacb03031a5a6f7d6a_gate%2520horizontal.jpg',
            slug: 'oakland-ca-horizontal-gate-with-1-gap',
          },
          {
            caption: "Petaluma, CA - Horizontal gate 4' Wide 6' Tall Gate",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12dd1d448d4b1ac4b6e154_Ergeon%2520Gates.jpg',
            slug: 'petaluma-ca-horizontal-gate-4-wide-6-tall-gate',
          },
          {
            caption: "San Mateo, 4' Wide 6' Tall Gate with Piano Lattice",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12dd3efb60677b0ce21f6f_Ergeon%2520Gates2.jpg',
            slug: 'amet-dignissimos-dolor',
          },
        ],
      },
      {
        groupName: 'Chain Link',
        groupSlug: slugify('Chain Link'),
        groupPhotos: [
          {
            caption: 'Single Gate Chain Link',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Brenda+Sandoval+1.jpg',
            slug: slugify('Single Gate Chain Link 1'),
          },
          {
            caption: 'Single Gate Chain Link',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Rod+Williamson+2.jpg',
            slug: slugify('Single Gate Chain Link 2'),
          },
        ],
      },
      {
        groupName: 'Vinyl',
        groupSlug: slugify('Vinyl'),
        groupPhotos: [
          {
            caption: '6’ Tall Privacy White Vinyl Single Gate',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/%5BPrivacy+-+White%5D+%5BRick+M.%5D+%5B2021%5D1.jpg',
            slug: slugify('6’ Tall Privacy White Vinyl Single Gate'),
          },
          {
            caption: '4’ Tall Privacy White Vinyl Single Gate',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/%5BPrivacy+-+White%5D+%5BLaura+T.%5D+%5B2021%5D1.jpeg',
            slug: slugify('4’ Tall Privacy White Vinyl Single Gate'),
          },
          {
            caption: '6’ Tall Privacy Tan Vinyl Single Gate',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/%5BPrivacy+-+Tan%5D+%5BSylvia+M.%5D+%5B2021%5D2.jpeg',
            slug: slugify('6’ Tall Privacy Tan Vinyl Single Gate'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Double',
    categorySlug: slugify('Double'),
    categoryGroups: [
      {
        groupName: 'Z-frame',
        groupSlug: slugify('Z-frame'),
        groupPhotos: [
          {
            caption: 'Double Gate Z-frame Arched Top Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Redwood+City+California+-+Double+Gate++2.jpg',
            slug: slugify('Double Gate Z-frame Arched Top Side by Side'),
          },
          {
            caption: 'Double Gate Z-frame Dog Ear Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Vallejo+California+-+Nail+Up+Dog+Ear+1.jpg',
            slug: slugify('Double Gate Z-frame Dog Ear Side by Side'),
          },
          {
            caption: 'Double Gate Z-frame Flat Top With Kickboard',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/double+gate+flat+top+kickboard.png',
            slug: slugify('Double Gate Z-frame Flat Top With Kickboard'),
          },
          {
            caption: 'San Jose, CA - Z-Frame Double Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e0baae722d20779cf0af_Ergeon%2520Gates16.jpg',
            slug: 'san-jose-double-gate-with-wide-z-frame-flat-top-board-on-board-2',
          },
          {
            caption: 'San Jose, CA - Z-Frame Double Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e10d2ce98fd1411aa97f_Ergeon%2520Gates15.jpg',
            slug: 'san-jose-double-gate-with-wide-z-frame-flat-top-board-on-board',
          },
          {
            caption: 'Martinez, CA - Z-Frame Double Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c420801bd7e82327d4ed01a_Martinez_Maggie%2520Roster(1).jpg',
            slug: 'martinez-double-drive-gate-with-wide-z-frame-dog-ear-kiln-dried-cedar-pickets-2',
          },
          {
            caption: 'Martinez, CA - Z-Frame Double Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c4207700ea8d5a8868d1496_Martinez_Maggie%2520Roster.jpg',
            slug: 'martinez-double-drive-gate-with-wide-z-frame-dog-ear-kiln-dried-cedar-pickets',
          },
          {
            caption: 'Campbell, CA - Z-Frame Double Gate Board on Board with Arch Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12dfddd3261a6e6ac2f7b9_Ergeon%2520Gates12.jpg',
            slug: 'campbell-double-gate-with-wide-arch-top-z-frame-louvered',
          },
        ],
      },
      {
        groupName: 'Box Frame',
        groupSlug: slugify('Box Frame'),
        groupPhotos: [
          {
            caption: 'Double Gate Metal Box Frame with Piano Key Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Oakland+California+-+Double+Gate+2.jpg.jpg',
            slug: slugify('Double Gate Metal Box Frame with Piano Key Lattice'),
          },
          {
            caption: 'Double Gate Boxed Frame Flat Top Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Boulder+Creek+California+-+Nail+Up+Flat+Top+1.jpg',
            slug: slugify('Double Gate Boxed Frame Flat Top Side by Side'),
          },
          {
            caption: 'Double Gate Metal Box Frame Flat Top Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Fairfield+California+-+Double+Gate+1.jpg',
            slug: slugify('Double Gate Metal Box Frame Flat Top Side by Side'),
          },
          {
            caption: 'Double Gate Box Frame with Arched Top Piano Key Lattice',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Oakland+California+-+Double+Gate+.jpg',
            slug: slugify('Double Gate Box Frame with Arched Top Piano Key Lattice'),
          },
          {
            caption: 'San Jose, CA - Box Frame Double Gate ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5cc21a174f10d601da71bc8b_sanjose%2520double%2520gate.jpg',
            slug: 'san-jose-ca-box-frame-double-gate',
          },
          {
            caption: 'Milpitas, CA - Box-Frame Double Gate with Arch Top ',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5cc09460822688343ed3dd78_gate%2520framed%2520double.jpg',
            slug: 'milpitas-ca-box-frame-double-gate-with-arch-top',
          },
          {
            caption: 'American Canyon, CA - Box Frame Double Gate Nail Up Dog Ear',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c6346a0d04094c63d82c329_American%2520Canyon%2520Box%2520Frame%2520Double%2520Gate%2520Dog%2520Ear.jpg',
            slug: 'american-canyon-ca-box-frame-double-gate-nail-up-dog-ear',
          },
          {
            caption: 'Sacramento, CA - Box Frame Double Gate Nail Up with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e084cc357a251241ef10_Ergeon%2520Gates14.jpg',
            slug: 'sacramento-double-drive-gate-with-wide-box-frame-board-on-board-stained-sealed-2',
          },
          {
            caption: 'Sacramento, CA - Box Frame Double Gate Board on Board with Flat Top',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c12e065b0a0f2c302809fba_Ergeon%2520Gates13.jpg',
            slug: 'sacramento-double-drive-gate-with-wide-box-frame-board-on-board-stained-sealed',
          },
        ],
      },
      {
        groupName: 'Picture Frame',
        groupSlug: slugify('Picture Frame'),
        groupPhotos: [
          {
            caption: 'Double Gate Picture Frame Board on Board with Lattice on Metal Frame',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Patterson+California+-+Double+Gate+2.jpeg',
            slug: slugify('Double Gate Picture Frame Board on Board with Lattice on Metal Frame'),
          },
          {
            caption: "Antioch, CA - Picture Frame Double Drive 8' Wide 7' Tall Gate",
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/5c633904d7d20af1af92832e_antioch%2520Picture-frame%2520Double%2520Drive%25208%2527%2520Wide%25207%2527%2520Tall%2520Gate.jpg',
            slug: 'antioch-ca-picture-frame-double-drive-8-wide-7-tall-gate',
          },
        ],
      },
      {
        groupName: 'Horizontal',
        groupSlug: slugify('Horizontal'),
        groupPhotos: [
          {
            caption: 'Double Gate Horizontal Side by Side',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Menlo+Park+California+-+Double+Gate+4.jpeg',
            slug: slugify('Double Gate Horizontal Side by Side'),
          },
          {
            caption: 'Double Gate Horizontal Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Oakland+California+-+Single+%26+Double+Gate.jpg',
            slug: slugify('Double Gate Horizontal Side by Side with Gaps 1'),
          },
          {
            caption: 'Double Gate Horizontal Side by Side with Gaps',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Oakland+California+-+Single+Gate+2.jpeg',
            slug: slugify('Double Gate Horizontal Side by Side with Gaps 2'),
          },
        ],
      },
      {
        groupName: 'Chain Link',
        groupSlug: slugify('Chain Link'),
        groupPhotos: [
          {
            caption: 'Double Gate Chain Link',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/1+(92).jpeg',
            slug: slugify('Double Gate Chain Link 1'),
          },
          {
            caption: 'Double Gate Chain Link',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Rod+Williamson+4.jpg',
            slug: slugify('Double Gate Chain Link 2'),
          },
        ],
      },
      {
        groupName: 'Vinyl',
        groupSlug: slugify('Vinyl'),
        groupPhotos: [
          {
            caption: '4’ Tall Privacy White Double Gate (Back)',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/%5BPrivacy+-+White%5D+%5BAngela+G.%5D+%5B2021%5D1.jpeg',
            slug: slugify('4’ Tall Privacy White Double Gate (Back)'),
          },
          {
            caption: '4’ Tall Privacy White Double Gate (Front)',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/%5BPrivacy+-+White%5D+%5BAngela+G.%5D+%5B2021%5D2.jpeg',
            slug: slugify('4’ Tall Privacy White Double Gate (Front)'),
          },
          {
            caption: '6’ Tall Privacy Tan Double Gate (Front)',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/gate/6+Ft+Privacy+Tan+Vinyl+Double+Gate.jpg',
            slug: slugify('6’ Tall Privacy Tan Double Gate (Front)'),
          },
        ],
      },
    ],
  },
  {
    categoryName: 'Sliding',
    categorySlug: slugify('Sliding'),
    categoryPhotos: [
      {
        caption: 'Sliding Gate Horizontal Metal Box Frame',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Berkeley+California+-+Horizontal+1.jpeg',
        slug: slugify('Sliding Gate Horizontal Metal Box Frame'),
      },
      {
        caption: 'Sliding Gate Metal Box Frame Board on Board with Privacy Lattice',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Brekeley+California+-+Single+Gate+3.jpeg',
        slug: slugify('Sliding Gate Metal Box Frame Board on Board with Privacy Lattice'),
      },
      {
        caption: 'Sliding Gate Metal Box Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+El+Cerrito+California+-+Picture+Frame+1.jpg',
        slug: slugify('Sliding Gate Metal Box Frame Board on Board 1'),
      },
      {
        caption: 'Sliding Gate Metal Box Frame Board on Board',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Berkeley+California+-+Rolling+Gate+2..jpeg',
        slug: slugify('Sliding Gate Metal Box Frame Board on Board 2'),
      },
      {
        caption: 'Sliding Gate Chain Link',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Fence+Installation+-+Ergeon+-+Vallejo++California+-+Chain+Link+2.jpg',
        slug: slugify('Sliding Gate Chain Link 1'),
      },
      {
        caption: 'Sliding Gate Chain Link',
        url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/6+(15).jpeg',
        slug: slugify('Sliding Gate Chain Link 2'),
      },
    ],
  },
];

export const DrivewayPhotoData = [
  {
    categoryName: 'Brushed Concrete',
    categorySlug: 'brushed',
    categoryGroups: [
      {
        groupName: 'Natural',
        groupSlug: 'natural',
        groupPhotos: [
          {
            title: 'Driveways',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BBrushed%5D+%5BTina+B.%5D+%5B2019%5D1.jpg',
            slug: 'brushed-concrete-driveway-1',
          },
          {
            title: 'Driveways',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/Oakland+-+multiproduct.jpg',
            slug: 'brushed-concrete-driveway-2',
          },
          {
            title: 'Patios',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BBrushed%5D+%5BZach+S.%5D+%5B2020%5D2.jpg',
            slug: 'brushed-concrete-patio',
          },
          {
            title: 'Walkways',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BBrushed%5D+%5BChris+M.%5D+%5B2019%5D1.jpg',
            slug: 'brushed-concrete-walkway',
          },
        ],
      },
    ],
    partners: [
      {
        name: 'Davis Colors',
        slug: 'davis-colors',
        url: 'https://www.daviscolors.com/',
        imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/davis-colors.png',
      },
    ],
  },
  {
    categoryName: 'Stamped Concrete',
    categorySlug: 'stamped',
    categoryGroups: [
      {
        groupName: 'Casual',
        groupSlug: 'casual',
        groupPhotos: [
          {
            title: 'Natural Flagstone Stamp',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BStamped%5D+%5BJoan+F.%5D+%5B2019%5D1.jpg',
            slug: 'stamped-and-stained-concrete-flagstone',
            description:
              'Natural flagstone stamp on colored concrete. Offers the looks of natural stone but without the hefty price tag. The stamp can be applied over any number of colors to achieve the desired look. Also looks great on medium to large driveways.',
          },
          {
            title: 'Ashlar Slate Stamp',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BStamped%5D+%5BPranav+T.%5D+%5B2021%5D1.jpeg',
            slug: 'stamped-and-stained-concrete-ashlar-slate',
            description:
              'Slate ashlar pattern stamp with dark gray colored concrete. Integrates a natural texture with an interesting casual pattern. This stamp looks great on driveways, walkways and patios.',
          },
          {
            title: 'Seamless Slate Stamp',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BStamped%5D+%5BDavid+K.%5D+%5B2019%5D1.png',
            slug: 'stamped-and-stained-concrete-seamless-slate',
            description:
              'Seamless slate stamp with dark gray colored concrete. Look is natural, simple and yet interesting. Works best with large driveways where pavers might not be a viable option or for homes in a natural setting',
          },
        ],
      },
    ],
    partners: [
      {
        name: 'Stamps',
        slug: 'concrete-stamps',
        url: 'https://www.pacificconcreteimages.com/product-category/concrete-stamps/',
        imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/concrete-stamps.jpg',
      },
      {
        name: 'Davis Colors',
        slug: 'davis-colors',
        url: 'https://www.daviscolors.com/',
        imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/davis-colors.png',
      },
    ],
  },
  {
    categoryName: 'Enhanced',
    categorySlug: 'enhanced',
    categoryGroups: [
      {
        groupName: 'Enhanced',
        groupSlug: 'enhanced',
        groupPhotos: [
          {
            title: 'Exposed Aggregate Concrete ',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/Concrete+Installation+-++Ergeon+-+Palo+Alto+California+-+Walkway+3.jpeg',
            slug: 'exposed-aggregate-concrete',
            description:
              'Exposed aggregate concrete is the universal term for concrete which incorporates natural stones, like pebbles, applied into the top layer of poured concrete. The result is a timeless look with unmatched durability. Great for surfaces that require a bit more traction as well.',
          },
          {
            title: 'Poured Concrete Pavers with Pebbles',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BBrushed%5D+%5BChristopher+P.%5D+%5B2021%5D2.jpg',
            slug: 'poured-concrete-pavers-with-pebbles',
            description:
              'A trending concrete application is the use of substantially sized pebbles between the slabs or pavers. Shown here large poured concrete slabs are punctuated with three to four inch gaps filled with smooth pebbles. When the base is prepared properly, these slabs hold up astonishingly well to wear and tear. A look that is sure to garnish compliments!',
          },
          {
            title: 'Brushed Concrete with Color',
            url: 'https://ergeon-photo-gallery.s3.us-west-1.amazonaws.com/driveway/%5BBrushed%5D+%5BNorman+T.%5D+%5B2020%5D3.jpeg',
            slug: 'brushed-concrete-with-color',
            description:
              'Add a dynamic twist to basic grey brushed concrete with integral color. The team at Ergeon can work with you to select the perfect brushed concrete color that will compliment the color of your home and highlight your landscape.',
          },
        ],
      },
    ],
    partners: [
      {
        name: 'Davis Colors',
        slug: 'davis-colors',
        url: 'https://www.daviscolors.com/',
        imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/davis-colors.png',
      },
    ],
  },
];
