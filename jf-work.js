/* jerryflorez.com — WORK page interaction layer.
   Left = project title index (as now). Right = three resting states:
     (1) REST     — right panel empty.
     (2) SCROLL   — a linear strip of cover images rises while you scroll, with the
                    branded blur-fade; the cover nearest the centre highlights its
                    title on the left; the strip fades out when you stop scrolling.
     (3) HOVER    — hovering a title fades the strip out and fades in 4–5 images from
                    that project as a clean, non-overlapping grid; leaving resumes.
   Precedence: HOVER > SCROLL > REST.

   DATA: put <div id="jf-work"></div> on the WORK page and load this file.
   Inside it, provide a Webflow Collection List whose items carry class "jfw-item" with:
     data-name   project title
     data-url    project link (or a child <a href>)
     data-cats   disciplines, comma-separated   (optional — used for the hover label)
   and 2–5 images bound inside each item (any <img>; first = cover for the strip).
   Bind the cover + up to four more single-image fields, or the project's main-image
   plus a few gallery stills. The script reads whatever <img> it finds, up to 5.
   No list found → the baked covers below render so the motion can be previewed. */
(function(){
  var root=document.getElementById('jf-work');
  if(!root||root.getAttribute('data-built'))return;
  root.setAttribute('data-built','1');

  /* baked preview set (covers only; real per-project multi-images come from the CMS) */
  var BAKED={projects:[{"name": "Telling the Bees", "cats": ["Film/Video"], "url": "/projects/telling-the-bees", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6acc97f5424a0bc5060a437e_6acc97db0a62fcb46f29673f_telling-the-bees-add-00.jpeg"]}, {"name": "The Latibule", "cats": ["Installation & Experience", "Architecture", "Fine Art"], "url": "/projects/latibule", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac91902d8348c9b147afd4a_6ac918eff61e3a3896470e2d_latibule-add-00.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac91902d8348c9b147afd4d_6ac918f15ece38798e2f2c2a_latibule-add-01.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac9147f0d796e37be0fea78_6ac91470453a6cc76da03d95_latibule-add-00.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac9147f0d796e37be0fea7e_6ac914721fbbce36c05921ac_latibule-add-01.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac9147f0d796e37be0fea8a_6ac914725ece38798e2d3f4b_latibule-add-02.jpeg"]}, {"name": "Sophie Castillo", "cats": ["Photography", "Music"], "url": "/projects/sophie-castillo-bts", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76d09ff7e9709b6133a73_6ac6824c1df1ce99cf92dd3b_6ac6824bdcff0b8af5965ceb_sophie-castillo-bts-12.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6824c1df1ce99cf92dd3b_6ac6824bdcff0b8af5965ceb_sophie-castillo-bts-12.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6824c1df1ce99cf92dd30_6ac68240fa26e17ec69396b0_sophie-castillo-bts-08.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6824c1df1ce99cf92dd1c_6ac6823035268d1239228799_sophie-castillo-bts-03.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6824c1df1ce99cf92dd14_6ac6823d43e1a1ae8d51a8fa_sophie-castillo-bts-07.jpeg"]}, {"name": "Downham 100 Workshop", "cats": ["Photography", "Community"], "url": "/projects/downham-100-workshop", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac68223e36c7f3d71d43e98_6ac681f004da5413beed65db_downham-100-workshop-00.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac68223e36c7f3d71d43ecc_6ac681fa72da65a67bd4231f_downham-100-workshop-03.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac68223e36c7f3d71d43e9c_6ac681f4c9044ce98bbe2788_downham-100-workshop-01.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac68223e36c7f3d71d43ec8_6ac681fe5802228af63cd0c0_downham-100-workshop-04.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac68223e36c7f3d71d43ec4_6ac68202ba454d3187296996_downham-100-workshop-05.jpeg"]}, {"name": "Dessert Runner", "cats": ["Photography", "Music"], "url": "/projects/dessert-runner", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac681df35268d123922634a_6ac681a0c9044ce98bbdf690_dessert-runner-03.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac681df35268d12392262b2_6ac681b581a089a13233b3a3_dessert-runner-10.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76b075c8a7e4e05cce69c_6ac76ad65b32bfc686bdccbc_dessert-runner-sel-02.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76b075c8a7e4e05cce6a3_6ac76ad90da5506a8c20c001_dessert-runner-sel-03.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac681df35268d12392262e9_6ac681bf3a0ce27c75a6629b_dessert-runner-13.jpeg"]}, {"name": "School of Building", "cats": ["Photography", "Architecture"], "url": "/projects/school-of-building", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6818f5802228af63cba4b_6ac6814f3181957e193c9535_school-of-building-00.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6818f5802228af63cba24_6ac68152d9892e5c8ad81d11_school-of-building-01.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6818f5802228af63cba14_6ac6815504da5413beed3f10_school-of-building-02.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6818f5802228af63cba19_6ac68158ba06aee346ade953_school-of-building-03.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac681905802228af63cba5d_6ac6815b3324053b04d43df5_school-of-building-04.jpeg"]}, {"name": "RIBA Awards", "cats": ["Photography", "Architecture"], "url": "/projects/riba-awards", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76562d1a4f73aef5bf211_6ac7651a49dba9ab0e961b79_riba-awards-sel-00.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76562d1a4f73aef5bf21d_6ac7651e0b467cce37659082_riba-awards-sel-01.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76562d1a4f73aef5bf219_6ac76522ee7c72e104bec1a4_riba-awards-sel-02.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76562d1a4f73aef5bf20b_6ac680fa12d594b851fb2e3f_riba-awards-08.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac76562d1a4f73aef5bf216_6ac7652a1ecd9c30627d64fd_riba-awards-sel-04.jpeg"]}, {"name": "Seeing Red BTS", "cats": ["Photography", "Music"], "url": "/projects/seeing-red-bts", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac67d9ac9044ce98bbc76fd_6ac67d6d8869d5e504dd9d04_seeing-red-bts-10.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac67d9ac9044ce98bbc7714_6ac67d785802228af63c3fc9_seeing-red-bts-14.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac67d9ac9044ce98bbc7706_6ac67d82649cdd9fa3593c9b_seeing-red-bts-18.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac67d9ac9044ce98bbc7721_6ac67d8aa1970401b5f256a9_seeing-red-bts-21.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac67d9ac9044ce98bbc7724_6ac67d8dac20000306dd6a36_seeing-red-bts-22.jpeg"]}, {"name": "Haile Ali", "cats": [], "url": "/projects/haile-ali", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6abd387c9a3a7a65bf6c728e_23630010.jpg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6abd38954cca6a01d3230670_23590021.jpg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6abd38955292f6b4913b32a4_23590007.jpg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6abd389494fa1069ef02d579_23630013.jpg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6abd3895eea80f91a64106d3_23590024.jpg"]}, {"name": "Dorado", "cats": ["Identity Design", "Creative Direction", "Digital/Web"], "url": "/projects/dorado-jewellery", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631678fb07f65ea3a7178_6ac6316342c9eada82d3e907_6ab6ae52e09bdc82fc4d64a0_611a95d5de36180f59e69d94_Dorado-20B.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631678fb07f65ea3a717b_6ac63164216824c24c65ce4b_6ab6ae53e09bdc82fc4d64ba_611a95e5eb4dfc1aee0dcf00_Dorado-20B.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631678fb07f65ea3a717f_6ac631654365fb33154c8467_6ab6ae53e09bdc82fc4d64af_611a95e42923c02eaeff61bf_Dorado-20W.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631678fb07f65ea3a7183_6ac6316638ec20ffb2cf6e63_6ab6ae52e09bdc82fc4d6498_611a95e3e4e90873427d140b_Raw-20Vers.jpeg"]}, {"name": "Building UAL's Future", "cats": ["Identity Design"], "url": "/projects/building-uals-future", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4cc73664421bdbf182_611a955d1996973d69b03976_Digital%2520Transformation%2520Timeline%2520Crop%25203%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4ec73664421bdbf206_611a956ba739fc46bd368f5e_Digital%2520Transformation%2520Timeline%2520Crop%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4cc73664421bdbf197_611a9568e4e90820f77d10d8_Programme%2520Symbols%25201%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4cc73664421bdbf1b1_611a9567a739fc8637368f33_Programme%2520Symbols%25202%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae4cc73664421bdbf178_611a95694dd8e15a85db7a68_Family%2520Resemblance%25201%2520(for%2520web).jpeg"]}, {"name": "Insights", "cats": ["Identity Design"], "url": "/projects/insights", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631d7c036c2b4dd37d6c1_6ac631d1d6d9c18683d23da5_6ab6ae497ed16e2cda021352_61a417612d39c18fd951bd78_UAL-20Insi.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631d7c036c2b4dd37d6c5_6ac631d2963e02cee6a77135_6ab6ae487ed16e2cda02133b_61a417616478a5dfb96d0fef_UAL-20Insi.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631d7c036c2b4dd37d6ce_6ac631d3472fe9920868943b_6ab6ae487ed16e2cda021336_61a4176096bf587885aedb7e_UAL-20Insi.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631d7c036c2b4dd37d6cb_6ac631d44365fb33154cb465_6ab6ae487ed16e2cda021349_61a41760712b462a2224c5b6_UAL-20Insi.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631d7c036c2b4dd37d6d5_6ac631d6600492799d0de00a_6ab6ae487ed16e2cda021343_61a4175f931b975bdfc6a13f_UAL-20Insi.jpeg"]}, {"name": "TrAIN", "cats": ["Identity Design"], "url": "/projects/train", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63204ebe21cee71728f0f_6ac631fe024573bb1d4576e5_6ab6ae4243494b2988cf01b6_61a41a1e8ac9ffa4c4948825_UAL-20TrAI.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63204ebe21cee71728efc_6ac631ffa452851541b50026_6ab6ae4543494b2988cf0200_61a41a1f14defd6da23210c8_UAL-20TrAI.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63204ebe21cee71728ef0_6ac63200ebe21cee71728c89_6ab6ae4243494b2988cf01b9_61a41a206d72eb8a82a6206e_UAL-20TrAI.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63204ebe21cee71728ef4_6ac632011c7f772c3c586952_6ab6ae4243494b2988cf01cc_61a41a161547c84868a2e6a7_UAL-20TrAI.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63204ebe21cee71728ef8_6ac63203472fe9920868ac78_6ab6ae4243494b2988cf01cf_61a41a1f0241c6867fe76075_UAL-20TrAI.jpeg"]}, {"name": "pensaer.", "cats": ["Architectural Photography", "Photography", "Creative Direction", "Digital/Web", "Identity Design"], "url": "/projects/pensaer", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63161449077f273947758_6ac6315ba1ab408322b2b975_6ab6ae3f215430ac73195d23_6559721b309c6b9c06f244a2_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63161449077f27394774d_6ac6315b80791e19dcbb7909_6ab6ae3f215430ac73195d2e_65597223840455618cfa0da5_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63161449077f273947753_6ac6315c597ec617571648e1_6ab6ae3f215430ac73195d35_65597230262466a4133b97aa_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63161449077f273947760_6ac6315d66684778b87a6ae5_6ab6ae40215430ac73195d46_65597240d430685b4dbaf96d_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63161449077f27394775b_6ac6315e8fb07f65ea3a6e46_6ab6ae3f215430ac73195d2b_6559724e31cdcff15ae38efc_Screenshot.jpeg"]}, {"name": "Close To Home", "cats": ["Identity Design"], "url": "/projects/close-to-home", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631fcebe21cee71728836_6ac631f34c0bb27954e454da_6ab6ae3b927b8668a558929c_65597d776c639cb0757a64eb_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631fcebe21cee71728846_6ac631f466684778b87ab60b_6ab6ae3b927b8668a5589294_65597e189bdbbe5f09661ab6_Overlay-20.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631fcebe21cee71728854_6ac631f5ebe21cee7172838e_6ab6ae3b927b8668a5589288_65597d829bdbbe5f0965c606_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631fcebe21cee7172884e_6ac631f5d6d9c18683d24e1e_6ab6ae3b927b8668a558928e_65597d952cf38d9a43c454e4_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631fcebe21cee71728849_6ac631f62aae52a4443f6b94_6ab6ae3b927b8668a5589291_65597da8e7571c0eed0a510b_Screenshot.jpeg"]}, {"name": "The xx - Night + Day", "cats": ["Photography"], "url": "/projects/the-xx-night-day", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631cfc036c2b4dd37d3aa_6ac631bb8fb07f65ea3a8ca9_6ab6ae2ae86c42448ed8890b_611aa4f72923c0d154000792__MG_8566-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631cfc036c2b4dd37d3a4_6ac631bc8fb07f65ea3a8d24_6ab6ae29e86c42448ed888c3_611aa504b19521b9f69e432a__MG_8721-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631cfc036c2b4dd37d3a7_6ac631bdb5745caffb5f72c0_6ab6ae2ae86c42448ed88902_611aa5002b4a4cc51df06963_IMG_9395-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631cfc036c2b4dd37d3b7_6ac631be78c620e82f2e5092_6ab6ae28e86c42448ed888b7_611aa507eb4dfc17100e4ce3_IMG_8840-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631cfc036c2b4dd37d3b0_6ac631bf600492799d0dd37c_6ab6ae2ae86c42448ed888ff_611aa50cdc1f965db231910d__MG_8595-2.jpeg"]}, {"name": "Lockdown", "cats": ["Photography"], "url": "/projects/lockdown", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae261cbf93d7ce39627e_611aa4c468233e3cfe06de3f_23570034-2%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae261cbf93d7ce396281_611aa4cdeb4dfc44260e48b3_23570018%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae261cbf93d7ce396274_611aa4c9dc1f96507c3190bc_23570019%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae261cbf93d7ce39627b_611aa4cd572ece909e8adaf6_23570026%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae261cbf93d7ce396284_611aa4cc68233e050106de44_23570028%2520(for%2520web).jpeg"]}, {"name": "Documenting Palermo", "cats": ["Photography"], "url": "/projects/documenting-palermo", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae1d8bfa7d79aa67ac6a_611aa37969802c3f6b2e17c5__MG_0039%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae1e8bfa7d79aa67ac9b_611aa38a6929fa329cb8c5f2__MG_0394%2520copy%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae1d8bfa7d79aa67ac70_611aa3dc9c8d1734f32dcf58__MG_0566%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae1e8bfa7d79aa67aca7_611aa3939c8d177f522dcc16__MG_0309%2520(for%2520web).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae1d8bfa7d79aa67ac73_611aa394fff952740da94059__MG_0065%2520(for%2520web).jpeg"]}, {"name": "Barry", "cats": ["Photography"], "url": "/projects/barry-road", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631b63c5eea4b7a3b4d84_6ac631a697df44419a031fbc_6ab6ae12a25814533519c912_6543e70659137019a320f781_Barry-20by.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631b63c5eea4b7a3b4d8a_6ac631a7d6d9c18683d22caa_6ab6ae13a25814533519c93b_6543e725dbeac21bbebab724_Barry-20by.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631b63c5eea4b7a3b4d9c_6ac631a8f27407cc0521e49f_6ab6ae12a25814533519c917_6543e72546c2f9b0e717e56c_Barry-20by.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631b63c5eea4b7a3b4d98_6ac631a9600492799d0dc4c0_6ab6ae13a25814533519c92a_6543e72572f30a9116555b2b_Barry-20by.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631b63c5eea4b7a3b4db2_6ac631aa21ba4e78d3283061_6ab6ae13a25814533519c927_6543e805f12b296b86ca895c_Barry-20by.jpeg"]}, {"name": "Kirkwood", "cats": ["Photography"], "url": "/projects/kirkwood", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631f1600492799d0de807_6ac631d8963e02cee6a7731a_6ab6ae0ed59afc1e091c80f9_6543e9227b2c009caea85444_Kirkwood-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631f1600492799d0de7fa_6ac631dab5745caffb5f7eda_6ab6ae0ed59afc1e091c80d7_6543e936eca6def09e7b9263_Kirkwood-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631f1600492799d0de800_6ac631dbebe21cee71727455_6ab6ae0ed59afc1e091c80da_6543e98a04b00b7eb2d810dd_Kirkwood-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631f1600492799d0de80d_6ac631dc3c5eea4b7a3b5cb1_6ab6ae0fd59afc1e091c811f_6543e98b0e2a9bedcf8bc1eb_Kirkwood-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631f1600492799d0de813_6ac631de4365fb33154cb694_6ab6ae0ed59afc1e091c8103_6543e973cf0c734d62dbe542_Kirkwood-2.jpeg"]}, {"name": "The Plantation", "cats": ["Photography"], "url": "/projects/the-plantation", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae0a9632d0e6c02c102b_6543eb5a163ec48c18e5ffa3_000012190020%2520The%2520Plantation%2520-%2520Jerry%2520Florez%2520-%25202022compressed.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae099632d0e6c02c1018_6543ee94697c07cd5affa9df_low-res%2520000012170005%2520The%2520Plantation%2520-%2520Jerry%2520Florez%2520-%25202022compressed.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae0a9632d0e6c02c102f_6543eb587b2c009caea9ecbc_000012170006%2520The%2520Plantation%2520-%2520Jerry%2520Florez%2520-%25202022compressed.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae099632d0e6c02c100b_6543eb59eca6def09e7d3dd8_000012170013%2520The%2520Plantation%2520-%2520Jerry%2520Florez%2520-%25202022compressed.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae099632d0e6c02c1007_6543eb5b82c4aca826a0bf21_000012160006%2520The%2520Plantation%2520-%2520Jerry%2520Florez%2520-%25202022compressed.jpeg"]}, {"name": "Friern", "cats": ["Photography"], "url": "/projects/friern", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae076d49bf6ab383fd85_65593185038e8e69b72c160d_Friern%2520for%2520Web%2520-%2520Re-edit%2520-Garden%252C%2520boxes%2520000104140036%2520SL%2520Friern%2520Road%2520by%2520Jerry%2520Florez.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae066d49bf6ab383fd66_65593253cecf881da4aec695_Friern%2520for%2520Web%2520-%2520Re-edit%2520-Garden%2520000104140035%2520SL%2520Friern%2520Road%2520by%2520Jerry%2520Florez.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae066d49bf6ab383fd53_6559323a9bdbbe5f0935dd03_Friern%2520for%2520Web%2520-%2520Re-edit%2520-Living%2520room%2520000104100014%2520SL%2520Friern%2520Road%2520by%2520Jerry%2520Florez.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae076d49bf6ab383fd97_655933c406244ca683b9f5ff_Friern%2520for%2520Web%2520-%2520Re-edit%2520-000104140016%2520Friern%2520Road%2520by%2520Jerry%2520Florez.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6ae066d49bf6ab383fd50_6559323a31cdcff15aba12c1_Friern%2520for%2520Web%2520-%2520Re-edit%2520-Living%2520room%2520000104090011%2520SL%2520Friern%2520Road%2520by%2520Jerry%2520Florez.jpeg"]}, {"name": "USB", "cats": ["Photography"], "url": "/projects/usb", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac630d1449077f273944a58_6ac630a2597ec6175715e0bd_6ab6ae037ed16e2cda01fd3f_655935f4aced22f21dd853e4_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac630feebe21cee7172270f_6ac630a488baf73b96825d90_6ab6ae037ed16e2cda01fd2b_655943d8694472e668cb9818_USB-20Even.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac630feebe21cee71722713_6ac630a559bba0853092f416_6ab6ae037ed16e2cda01fd23_655943b2d628c3fb642e787c_USB-20Even.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac630feebe21cee71722724_6ac630a5a1ab408322b28c4a_6ab6ae037ed16e2cda01fd28_655943634b526a2961f09aa1_USB-20Even.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac630feebe21cee7172271c_6ac630a6597ec6175715e2c2_6ab6ae037ed16e2cda01fd32_655942c14f2f3a8d37b445a8_October-20.jpeg"]}, {"name": "Casino", "cats": ["Photography"], "url": "/projects/casino", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6322978c620e82f2e6225_6ac632142aae52a4443f723b_6ab6adff7c5809b502e6f05c_65593e91ef2f6abce104ba87_Casino-20b.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6322978c620e82f2e623f_6ac632158a63f5903def71f2_6ab6ae017c5809b502e6f0bf_65593fb14f2f3a8d37b245e1_Casino-20b.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6322978c620e82f2e622e_6ac632167d8cbcb7c28a076a_6ab6adff7c5809b502e6f070_65593eb24cb61f6f2b8c1418_Casino-20b.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6322978c620e82f2e6236_6ac6321781d2ffcac2f84a24_6ab6ae007c5809b502e6f08c_65593eb33bccc1e0f9375d48_Casino-20b.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6322978c620e82f2e623c_6ac63218b5745caffb5f9f5e_6ab6adff7c5809b502e6f066_65593eab4f2f3a8d37b190fd_Casino-20b.jpeg"]}, {"name": "Collect Fair 2025", "cats": ["Photography", "Installation & Experience"], "url": "/projects/collect-fair-2025", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6321159bba085309354ae_6ac63206024573bb1d457ab1_6ab6adee0dfd462531bda847_69b4918c3a139e0a3a4e5689_68e0171c2d.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6321159bba085309354bc_6ac632060e8da9348795ad94_6ab6adee0dfd462531bda850_69b49192cda4f866c020576c_6917a495a1.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6321159bba085309354b9_6ac632083c5eea4b7a3b7131_6ab6adef0dfd462531bda865_69b491d22febe6af180476fb_Collect-20.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6321259bba085309354ce_6ac63209216824c24c65f9c3_6ab6adef0dfd462531bda868_69b491dd69c457291a0db97d_Collect-20.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac6321159bba085309354b2_6ac6320a3c5eea4b7a3b720c_6ab6adf00dfd462531bda884_69b491e4db2b509f6a204d00_Collect-20.jpeg"]}, {"name": "Ælfred", "cats": ["Photography"], "url": "/projects/aelfred", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631a4f27407cc0521e2fe_6ac6319d3c5eea4b7a3b3f99_6ab6adec30978ba5ca65fe30_6a7486b185cd91cd19af4082_FC228D39-7.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631a4f27407cc0521e306_6ac6319ec036c2b4dd37c680_6ab6adec30978ba5ca65fe40_6a748a85e6431fe1c58dc709_0A54E674-2.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631a4f27407cc0521e313_6ac6319e4365fb33154c9657_6ab6adec30978ba5ca65fe36_6a74871a926cb552f7dd9640_C4C08399-D.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631a4f27407cc0521e303_6ac631a066684778b87a8e47_6ab6adec30978ba5ca65fe48_6a74871fe5aa7b4328a3258c_0B49956B-5.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac631a4f27407cc0521e31a_6ac631a02510bfe84f133346_6ab6adec30978ba5ca65fe4c_6a74871ec1625bcc40473590_8F0E8147-8.jpeg"]}, {"name": "Shapes of Absence", "cats": ["Photography", "Book Design", "Installation & Experience", "Creative Direction"], "url": "/projects/photobook-shapes-of-absence", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adeade807c759715fd67_6a81e235049a52dd81192ad8_17B52DE8-B24E-4783-892A-9FA4931A3A9E_1_102_o.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adeade807c759715fd96_6a81e84e578bf13b6558b32e_WhatsApp%2520Image%25202026-08-04%2520at%252019.59.45%2520(5).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adeade807c759715fd5d_6a81e8620528e5b327d29a2f_WhatsApp%2520Image%25202026-08-04%2520at%252020.05.34%2520(1).jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adeade807c759715fd6b_6a81e314d8bebf05f9e96f95_08C76207-90CD-4B1A-94FD-0A96DAA22A9B_1_102_o.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ab6adeade807c759715fd61_6a81e7fa12dc249dde088d21_WhatsApp%2520Image%25202026-08-04%2520at%252020.05.32.jpeg"]}, {"name": "LA MURALLA", "cats": ["Photography"], "url": "/projects/la-muralla", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63173024573bb1d4556cc_6ac63168963e02cee6a7549a_6ab6ade743494b2988ced88a_6a88482931acf65474d885a7_C0909E5B-D.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63173024573bb1d4556c9_6ac63168472fe99208686c7b_6ab6ade743494b2988ced8a4_6a88484bf1118f021c1c441d_B90AF5BE-3.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63172024573bb1d4556b3_6ac63169024573bb1d45547c_6ab6ade843494b2988ced8bf_6a884856713c650b4d618060_D1A054ED-E.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63173024573bb1d4556d1_6ac6316a60c1488d2904d6ae_6ab6ade743494b2988ced89d_6a88486e713c650b4d618aae_4258C94F-E.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63173024573bb1d4556bd_6ac6316b66684778b87a71f6_6ab6ade843494b2988ced8d8_6a884887e4031765ebb9423a_6B05903A-6.jpeg"]}, {"name": "BARTON: The Afterlife", "cats": ["Creative Direction", "Photography", "Identity Design", "Set Design", "Installation & Experience"], "url": "/projects/cover-art-the-afterlife", "imgs": ["https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63158597ec61757164698_6ac6313b449077f273946d0f_6ab6adc8c73664421bdbb419_69b46f37e56806560545631c_Screenshot.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63158597ec61757164695_6ac6313d4365fb33154c7752_6abd406a44964b494bc05b13_000107820028.jpg.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63158597ec617571646a1_6ac6313e0d1043ca5d008e55_6abd41530b7e2cc95b50fde3_000107790018.jpg.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63159597ec617571646b1_6ac6313f60c1488d2904c8f7_6abd41539dd47278e0f6a800_000107790017.jpg.jpeg", "https://cdn.prod.website-files.com/602d633f67a82943545a5c58/6ac63158597ec617571646a5_6ac63140b5745caffb5f4dcb_6abd41536326f39ba58d139f_000107790016.jpg.jpeg"]}]};

  function realSrc(img){
    var s=img.currentSrc||img.getAttribute('src')||img.src||'';
    var bad=function(u){return !u||u.indexOf('data:')===0||u.indexOf('placeholder')>=0||u.indexOf('/plugins/')>=0;};
    if(!bad(s))return s;
    var bg=(img.style&&img.style.backgroundImage)||'',m=bg.match(/url\((["'])(.*?)\1\)/)||bg.match(/url\(([^)]+)\)/);
    var u=(m?(m[2]||m[1]):'').replace(/^["']|["']$/g,''); if(u&&u!=='none'&&!bad(u))return u;
    var ds=img.getAttribute('data-src'); if(ds&&!bad(ds))return ds;
    var ss=img.getAttribute('srcset'); if(ss){var f=ss.split(',')[0].trim().split(' ')[0]; if(f&&!bad(f))return f;}
    return '';
  }
  function readList(){
    var nodes=root.querySelectorAll('.jfw-item'); if(!nodes.length)return null;
    var projects=[];
    [].forEach.call(nodes,function(n){
      var imgs=[]; [].forEach.call(n.querySelectorAll('img'),function(im){var s=realSrc(im); if(s&&imgs.indexOf(s)<0&&imgs.length<5)imgs.push(s);});
      if(!imgs.length)return;
      var a=n.querySelector('a'),url=n.getAttribute('data-url')||(a&&a.getAttribute('href'))||(n.tagName==='A'?n.getAttribute('href'):'');
      var cats=(n.getAttribute('data-cats')||'').replace(/ \/ /g,'/').split(',').map(function(s){return s.trim();}).filter(Boolean);
      projects.push({name:n.getAttribute('data-name')||(a&&a.textContent.trim())||'',url:url||'',cats:cats,imgs:imgs});
    });
    var wrapL=nodes[0].closest('.w-dyn-list')||nodes[0].parentNode; if(wrapL)wrapL.style.display='none';
    return projects.length?{projects:projects}:null;
  }
  var DATA=readList()||BAKED, P=DATA.projects;

  /* ---------------- styles (scoped, site fonts, brand palette) ---------------- */
  var CSS=`
  #jf-work{--bg:#000;--ink:#f2f0ec;--mute:rgba(242,240,236,.42);--faint:rgba(242,240,236,.14);
    --frame:rgba(242,240,236,.12);--red:#e6392e;
    --display:"Bluunext Webfont","Bluunext",sans-serif;--ui:"Bluunext Titling","Bluunext Webfont",sans-serif;
    --serif:"Averia Serif Libre",Georgia,serif;--ease:cubic-bezier(.16,.84,.44,1);--pb:env(safe-area-inset-bottom,0px);
    position:relative;display:flex;height:100vh;background:transparent;color:var(--ink);
    font-family:var(--ui);-webkit-font-smoothing:antialiased;overflow:hidden;}
  #jf-work *{box-sizing:border-box;}
  #jf-work .jfw-rail{width:33vw;flex:0 0 33vw;z-index:4;padding:clamp(84px,12vh,128px) 2.4vw 34px 2.8vw;display:flex;flex-direction:column;}
  #jf-work .jfw-swlabel{font-family:var(--display);font-weight:700;font-size:clamp(12px,1.0vw,16px);letter-spacing:.02em;text-transform:uppercase;color:rgba(242,240,236,.86);margin-bottom:22px;}
  #jf-work .jfw-list{display:flex;flex-direction:column;align-items:flex-start;gap:2px;overflow:auto;scrollbar-width:none;}
  #jf-work .jfw-list::-webkit-scrollbar{display:none;}
  #jf-work .jfw-ti{appearance:none;background:none;border:0;padding:3px 0;margin:0;cursor:pointer;text-decoration:none;text-align:left;
    font-family:var(--display);font-weight:700;font-size:clamp(15px,1.5vw,22px);line-height:1.18;letter-spacing:.006em;
    color:rgba(242,240,236,.82);transition:color .35s var(--ease),filter .45s var(--ease),opacity .45s var(--ease);}
  #jf-work .jfw-ti:hover{color:var(--ink);}
  #jf-work .jfw-ti.active{color:var(--red);}
  #jf-work .jfw-ti.active::before{content:"— ";}
  /* when a title is hovered, or a cover is centred, the others recede (branded) */
  #jf-work .jfw-list.focusing .jfw-ti:not(.active):not(:hover){filter:blur(1.6px);opacity:.4;}
  #jf-work .jfw-ti:focus-visible{outline:1px solid var(--red);outline-offset:3px;}

  #jf-work .jfw-stage{flex:1;height:100%;position:relative;overflow:hidden;}
  /* SCROLL strip — a vertical column of covers */
  #jf-work .jfw-strip{position:absolute;inset:0;opacity:0;filter:blur(9px);transition:opacity .55s var(--ease),filter .55s var(--ease);will-change:opacity,filter;pointer-events:none;}
  #jf-work .jfw-strip.on{opacity:1;filter:blur(0px);pointer-events:auto;}
  #jf-work .jfw-cov{position:absolute;left:0;right:0;margin:0 auto;display:block;will-change:transform,filter,opacity;}
  #jf-work .jfw-cov a{display:block;text-decoration:none;}
  #jf-work .jfw-cov img{display:block;width:100%;height:auto;border:1px solid var(--frame);background:#0a0a0a;box-shadow:0 14px 60px rgba(0,0,0,.6);}
  /* HOVER grid — 4–5 images, clean, non-overlapping */
  #jf-work .jfw-grid{position:absolute;inset:0;padding:clamp(70px,10vh,120px) 4vw 6vh;display:grid;gap:14px;align-content:center;
    grid-template-columns:repeat(2,1fr);opacity:0;filter:blur(9px);transition:opacity .5s var(--ease),filter .5s var(--ease);pointer-events:none;}
  #jf-work .jfw-grid.on{opacity:1;filter:blur(0px);pointer-events:auto;}
  #jf-work .jfw-gi{margin:0;overflow:hidden;opacity:0;transform:translateY(8px);transition:opacity .5s var(--ease),transform .6s var(--ease);}
  #jf-work .jfw-grid.on .jfw-gi{opacity:1;transform:none;}
  #jf-work .jfw-gi:first-child{grid-column:1 / -1;}        /* hero image spans both columns */
  #jf-work .jfw-gi a{display:block;}
  #jf-work .jfw-gi img{display:block;width:100%;height:100%;object-fit:cover;border:1px solid var(--frame);background:#0a0a0a;}
  #jf-work .jfw-gi:first-child img{max-height:46vh;}
  #jf-work .jfw-gi:not(:first-child) img{aspect-ratio:4/5;}
  @media (prefers-reduced-motion:reduce){#jf-work .jfw-strip,#jf-work .jfw-grid,#jf-work .jfw-gi,#jf-work .jfw-cov{transition:none;}}
  @media (max-width:820px){
    #jf-work{height:auto;min-height:100vh;flex-direction:column;overflow:visible;}
    #jf-work .jfw-rail{width:100%;flex:none;padding:84px 6vw 10px;}
    #jf-work .jfw-list{overflow:visible;}
    #jf-work .jfw-stage{display:none;}                      /* motion layer is desktop; mobile = plain index */
  }`;
  var st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

  /* ---------------- build DOM ---------------- */
  function el(t,c,h){var e=document.createElement(t); if(c)e.className=c; if(h!=null)e.innerHTML=h; return e;}
  var rail=el('aside','jfw-rail');
  rail.appendChild(el('div','jfw-swlabel','Works'));
  var listEl=el('nav','jfw-list'); rail.appendChild(listEl);
  var stage=el('main','jfw-stage'), strip=el('div','jfw-strip'), grid=el('div','jfw-grid');
  stage.appendChild(strip); stage.appendChild(grid);
  root.appendChild(rail); root.appendChild(stage);

  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var clamp=function(v,a,b){return v<a?a:v>b?b:v;};
  var mode='rest', hoverIdx=-1, activeIdx=-1, off=0, maxOff=1, idleT=null, gridFor=-1;

  /* title index + cover figures */
  var titles=[], covs=[];
  P.forEach(function(p,i){
    var a=document.createElement('a'); a.className='jfw-ti'; a.href=p.url||'#'; a.textContent=p.name;
    a.addEventListener('mouseenter',function(){enterHover(i);});
    a.addEventListener('mouseleave',function(){leaveHover(i);});
    a.addEventListener('focus',function(){enterHover(i);});
    listEl.appendChild(a); titles.push(a);

    var fig=el('figure','jfw-cov'); var ia=document.createElement('a'); ia.href=p.url||'#'; ia.setAttribute('aria-label',p.name);
    var img=new Image(); img.src=p.imgs[0]; img.alt=p.name; img.loading='eager';
    ia.appendChild(img); fig.appendChild(ia); strip.appendChild(fig);
    var C={p:p,fig:fig,img:img,aspect:1,y:0,h:0};
    img.addEventListener('load',function(){C.aspect=(img.naturalWidth/img.naturalHeight)||1; layoutStrip(true);});
    covs.push(C);
  });

  /* ---------------- SCROLL strip geometry ---------------- */
  var COVW=0.52;                                   /* cover width as fraction of stage */
  function layoutStrip(render){
    var sw=stage.clientWidth, sh=stage.clientHeight||innerHeight, w=sw*COVW, y=sh*0.30, pitch=sh*0.72, maxB=0;
    covs.forEach(function(C){
      C.w=w; C.h=w/C.aspect; C.y=y;
      C.fig.style.width=w+'px';
      y+=Math.max(pitch, C.h+sh*0.14); maxB=C.y+C.h;
    });
    maxOff=Math.max(1, maxB - sh*0.5);             /* last cover can reach centre */
    sizePin();
    if(render!==false) paintStrip();
  }
  function paintStrip(){
    var sh=stage.clientHeight||innerHeight, cy=sh/2, best=-1, bestD=1e9;
    covs.forEach(function(C,i){
      var top=C.y-off, cc=top+C.h/2, d=Math.abs(cc-cy)/(sh*0.5); if(d>1)d=1;
      C.fig.style.top=top+'px';
      C.fig.style.transform='translateY(0px)';
      C.fig.style.filter='blur('+(d*d*3.2).toFixed(2)+'px)';
      C.fig.style.opacity=(1-d*0.5).toFixed(3);
      if(d<bestD){bestD=d;best=i;}
    });
    if(mode!=='hover') setActive(best);
  }

  /* ---------------- left-panel highlight ---------------- */
  function setActive(i){
    if(i===activeIdx)return; activeIdx=i;
    titles.forEach(function(t,k){t.classList.toggle('active',k===i);});
    listEl.classList.toggle('focusing', i>=0 && (mode==='scroll'||mode==='hover'));
  }

  /* ---------------- HOVER grid ---------------- */
  function buildGrid(i){
    if(gridFor===i)return; gridFor=i;
    grid.innerHTML='';
    var p=P[i], imgs=p.imgs.slice(0,5);
    if(imgs.length<2 && p.imgs.length) imgs=p.imgs;         /* single-image fallback */
    imgs.forEach(function(src){
      var f=el('figure','jfw-gi'); var a=document.createElement('a'); a.href=p.url||'#';
      var im=new Image(); im.src=src; im.alt=p.name; im.loading='eager';
      a.appendChild(im); f.appendChild(a); grid.appendChild(f);
    });
  }
  function enterHover(i){
    hoverIdx=i; mode='hover'; buildGrid(i);
    strip.classList.remove('on'); grid.classList.add('on'); setActive(i);
  }
  function leaveHover(i){
    if(hoverIdx!==i)return; hoverIdx=-1; grid.classList.remove('on');
    mode = scrolling ? 'scroll' : 'rest';
    if(mode==='scroll'){strip.classList.add('on'); paintStrip();}
    else { listEl.classList.remove('focusing'); setActive(-1); }
  }

  /* ---------------- scroll activity + pin ---------------- */
  var scrolling=false;
  function markScrolling(){
    scrolling=true;
    if(mode!=='hover'){mode='scroll'; strip.classList.add('on');}
    clearTimeout(idleT);
    idleT=setTimeout(function(){
      scrolling=false;
      if(mode==='scroll'){mode='rest'; strip.classList.remove('on'); listEl.classList.remove('focusing'); setActive(-1);}
    },480);
  }

  /* pin the section so page-scroll drives the strip offset, then releases (as home page) */
  var wrap=document.createElement('div'); wrap.className='jfw-pin';
  root.parentNode.insertBefore(wrap,root); wrap.appendChild(root);
  root.style.position='sticky'; root.style.top='0';
  function sizePin(){ wrap.style.height=((stage.clientHeight||innerHeight)+maxOff)+'px'; }
  function onScroll(){
    if(innerWidth<=820)return;
    var top=wrap.getBoundingClientRect().top, no=clamp(-top,0,maxOff);
    if(Math.abs(no-off)>0.5) markScrolling();
    off=no; if(mode!=='hover') paintStrip();
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){layoutStrip();});
  layoutStrip();
})();
