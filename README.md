# collie-docs

* [Overview](#Overview)
  * [1 Movies Collector System](#1-Movies-Collector-System)
    * [API Application](#API-Application)
    * [CLI Application](#CLI-Application)
    * [Web Application](#Web-Application)
  * [2 Deployment](#2-Deployment)
    * [API Application](#API-Application)
    * [CLI Application](#CLI-Application)
    * [Web Application](#Web-Application)

---

## Overview

> &#x1F4D7; Software Architecture based on [C4Model](https://c4model.com/)

> I'm missing fourth layer XD

**Level 1: System Context diagram**

At México, CDMX there are two mainly companies offering theaters to see movies, [Cinepolis](https://cinepolis.com/) and [Cinemex](https://cinemex.com/), the system will collect information from both websites and put it together in a simple Web UI so the user don't have to look for the same movie into two different web pages.

So Movies Collector System is intended to help anyone to find an scheduled movie and their details as date, time, location, distance, duration and of course which brand is offering it.

**Scope**: A single software system which will be "serverless" and will be handle it by CI/CD.

**Primary elements**: Our users will be anyone looking for a movie and some theater to go to watch it.
[Cinepolis](https://cinepolis.com/) and [Cinemex](https://cinemex.com/) both are Mexican movie theater chain with theaters around all the country.

**Intended audience**: Everybody, both technical and non-technical people, inside and outside of the software development team.


![diagram](https://www.plantuml.com/plantuml/svg/0/lL9DJm8n4BsJy1z6BcAYxCMJ9maIDG4b2Y6UIBSxG9Dkk-bCMVptJdV1hnYzUUhqzVMzDzDU4wl0iRJTpebnsiO2OSjSqLMM1LKFDeQtCO-4GNl7w7YWVPcf8XZbTZPMCHjTNioiShoOJZAh68a5MeqIUy-3gf7kTYR3byV5VBMydz-j9kFRySDD_opXCmpaNJyPd4Dl8KjFrgNe4R27jN45A2ZzpY0egScN2Bn5CGgWTifObLjCL484mprHVNubnhAllRK6sureJfC6mKXGrEm3j2UGDP31v3kqrjS4EXABJ_Z3lfRP-CZWrCvi184S6Mj41uLPhp78jA3672grGVe8jXhlkQ-DmyfRG-8wEjOfmYo8MO7XbDxl3k2GIxeKRw0sEEcWAkdPhNqe5HllGEKfJnDNXAtN3KnjTBt58jeVavIuF-IGwlzIT3jFQ0zl_-srv2Sqb4JuUlHvSh-psgwEd6xd6btHVCSt)

## 1 Movies Collector System

`/1 Movies Collector System`

[Overview](#collie-docs)

**Level 2: Container diagram**

**Scope**: A single software system.

**Primary elements**: Containers within the software system in scope.
Supporting elements: People and software systems directly connected to the containers.

**Intended audience**: Technical people inside and outside of the software development team; including software architects, developers and operations/support staff.

**Notes**: This diagram says nothing about deployment scenarios, clustering, replication, failover, etc.


![diagram](https://www.plantuml.com/plantuml/svg/0/lLHDRzim3BtxLt0vR0dGsPUTTbgM5lr0qdbrYcAdW9PPHu0i2PASjXZstqV9pk0smB3JSeWLvl7naO_o5n_GXRvJsJkfXUeRWdq8rdyk2eTFUIl3lgzxJquO7KY7N9YkmCP9r0VLsxvOVVfOAjJXVhCk50RoWKEx5QDHQdAvZTpPUldZs_rszt2zlTgjBoulRi_dYomhoNcZvv7-36Rt_9Znyu7PF0G3Zr8tWD0Qqq1d3f80EU1DHn3snBKSu06bmbfHn7iYa66soAeN7wZRNJo7kM0HrYZfcNXrFCSgfMF6Xjm73qzKWyMMSbWgPPvIRIu0Fj605mujC-j7upeCqcZ0slHXqCJ4oeWKzeC-iQUcL-HFXNJqFChWq_yMyTNqka7tCXT6AKv9KTQmIGImuYY9O1mCU2XIID9i0JypuCyVJ-UEK0IqDfh5ifVMAZbKZqsTav87TdQG7pWkODoUf2s5fMxPjDWmu2HzyQOIMicCo_BwRP4RTfvd8cquWrlJq4sLk9Vihp9GaJiCopHEE8qpZdXI350fUEorY3zGoV32qfpfsprSyh3ttzV0XKya2HKbhTR_AgdihQLmgYQEeMDAQ31WZPvu2KQpfouV9QK5u0sWP-PYkR6RE3v_8h2femaZQQnwQ-2E50vjml4Vg7X7EfnlZ6xDURs8o8hzPtN7dHfl6Pzg5rjvjNq-2YS6oOw_DNRf71J5NMnDwfs2oFES5IQ9B6AoEeErVEdJTHmdNbnjjsKrjXJn2PKwEYBl21iFx-71oK0JPFBb1Fa6-1ezVJaSawhXebrjDsie9_DzbJHSvB-b_CfYml1ccroNbBB8lf1kudlnDm00)

## API Application

`/1 Movies Collector System/API Application`

[Overview](#collie-docs)

**Level 3: Component diagram**

**Technologies**: Javascript and NodeJS as runtime environment.

**Other main technologies**: Apollo server, graphql and serverless framework.

**Scope**: A single container.

**Primary elements**: Components within the container in scope.
Supporting elements: Containers (within the software system in scope) plus people and software systems directly connected to the components.

**Intended audience**: Software architects and developers.


![diagram](https://www.plantuml.com/plantuml/svg/0/lLLDSzem4BtxLsmvj313uT9JJw4aau-1b0QOJ4_CsbwmfhBaIZ99ffF_dfLa4qFI7ii1nFhjxjlTj_APTMXSNShaWr2Ph7E2mhdAVXsF3JwCTi8LTLfRCfbMZfGRPReSOsu4ghsigtey_V9v8L6vzNmsbkZ8EZPjfhgijFBuoiTEPfEVtzUhpVtrwcepkxYyk3tl3v9aGSPgrVVXXz1Ryq-FV-yvcWMdOIjK3WWxhNCezLuG81kiBWbSGPpB0EvHI4mbURmb0k5wWsJvP1sLcuj7ry-4eafBOJdmj3txB0l34NCodomyK0eLxcW44odrGyZD2S26C60pWnL7LbjjIdH2Ay1Krovoui1IPy5i8x-ieBoMPDyIAUcneS6d_qtYcwvLZkQfdsafsILOcSCy180fMobpsa34mpYO1FK6y2S1_anP0SZSJTyGPWwhoW-BQK-gIegOtHTrJbBiURAHlcDx1erw0hTW5ch7G_C50tRS1yUPNabZ9JZqP75zbAsb5fqQoJ6MYMiF3mTOajb7QLro4uiViuubd0xqNA7hUbT0YxCHDtWdYI6hfI-JWzorvn2HMryYvCJo5QyzuN_4myf9nWcL-8lWTqt6-UutmyxHOOesgDcGCuAON6eOFsmbttZ7eNNay2v9hak5eSRruYbpyC1oXa-n0NU4ETHAR0NbH_BQ6bqUa_A93wp2eXrItf4yjBtR6P-qmyp3EezFwJN8vnEvPTBFVZgxFbNQ3Qy_BuQet11kkRKtoy1nKLSLkLXUis673fSSyb0HhrspNjt2NM6q5q5OETuvUkHO2gLVKIzOUwhIVfxw4JT1VTPRxKiDuTYlVG9H6lsvLZjzdWw2MhXwPjTkSJlaOPpwyRvRJvmO94h-LbY6ivFajt-dG-taij5er31CNdlUBcpSetMZWaRduwlLQh5idE8e6HMgQf5U9XO-mhqHZZh8C9itoBy1kxTnYr_6c-rgDP_1ejFU8wTuS_xBvJdn3l5LqhcV6bcTaShzY-W5)

## CLI Application

`/1 Movies Collector System/CLI Application`

[Overview](#collie-docs)

**Level 3: Component diagram**

**Technologies**: Javascript and NodeJS as runtime environment.

**Other main technologies**: Puppeteer

**Scope**: A single container.

**Primary elements**: Components within the container in scope.
Supporting elements: Containers (within the software system in scope) plus people and software systems directly connected to the components.

**Intended audience**: Software architects and developers.


![diagram](https://www.plantuml.com/plantuml/svg/0/lLLDRnen4BtpAwOvj22bSEcffr8IvKEGqW2AUefclGDOyjgMxOL4LVvxn_Pkkf2FKrKEYzSUltapysRscm_eGbsftWUfXQfBWcq8rdyTZHpkXniPjdLHUtB2w40w38MfHbWwYNgdQbkF9by-pnNgi9fDHme3-S1RznDJMQEZlOtOlUduru_LylxkQdbvFps_EByvwmzwlJavRtG_mf_2oOh_JlZ_Zj4y10DhgKj0s1XJGcLsaW1vmvkA86o9VJd07Kg5XQ9exub0XfD1R_7e0rNtvm-XBwGcQvJq33nfrz7Bt35YIUwJXpqLO753GnWhPVR9Dpi0ds302uUMaVNQk0g3D1gmC7N8d1XO6P6sVUOdjbJMYlnB8XKzD3HuzRz9V3UrBj4zzeLHYg-aNUOmIm0muLqImJZ8zZ1AMv9E1l2x1_oRi0AGkRk-8nG1hOt5OjfZQvNCtcDGPwJaZYkRwGVU5z2e9t5Bsr9lk6WnOC3EzS6H9xII4SVpgsCdrrnvpecquHHkJ4dNYuGzvleg0mjokooc9iFFwQmOjytfkjOYug6IuH5s4bbi5vpcxSyfiCjZCfqCgiXgCZrarUOfNshqtq-5iqdWIwfiR16OOs3nfZYc-9Y9dX7BdMNSsjXiCunGLQosoDNbE0e-9HU54D_e8JW-15GAD559PLSbJH27d2Jxc7GQuuhVMP8wFAVte5KMMNkNozaKzZmGWBmb8TTSLnSrbZ9lUOn8KIjqC5aik1Upclox1793lEw-QP5_xvorgDDndZaiVUJdGJ5kIH1hk8HQiwV3Z6Q7h6_f0uyRFcgaLMB0Wg7OwRFNMr8T1RoPzoxHrwySPUhumX7oSOXlM2VGDsoVZZgnBA98sn1vVMCY5kO6WlO45ZnvAkpFZDwOisAGIiZWdEPsKZMpcrU5YxayoAsFQIGsaXK_DLPf7HJ52RSnAVaKn70uR7Zssg3-3gKyD5PDKPkE7bqkb_D5SodQ9wiKLMjvIrXw-0XtJWRgMAPsVs7vbc7tYzFQTqKyvvddNxkKI_pUbQTUl90_bvqPt5Jj6-aoVcp_0000)

## Web Application

`/1 Movies Collector System/Web Application`

[Overview](#collie-docs)

**Level 3: Component diagram**

**Technologies**: React, Apollo client and react95.

**Scope**: A single container.

**Primary elements**: Components within the container in scope.
Supporting elements: Containers (within the software system in scope) plus people and software systems directly connected to the components.

**Intended audience**: Software architects and developers.


![diagram](https://www.plantuml.com/plantuml/svg/0/lLLDRzf04BtxLqmvj22bSEcffr8IXKIG4Y2AUa9ZUy2hhdVTtJK1LVdldTsr-H1jr5Cvu6NyvisRh-MBTMXSNShadL2Ph7E2mhdAVXuC3BxqDy8LTLfRCfbMZfJhPxeSO6u4ggsigtem-lHn9b6vf-ba8D6HTMnQZNHPQUNnbUTE9iFltvwMg-UxvNWrkRczURZkzf9aHiPgrVNqLz1vuaU7dy_CPi5fM0kL0y96wnnAlHK4o0QhIm9N4CSoW5iK4bD97c-9GBXEBrdihQDoTRDptKmeghGKbeb7xTb7cHbcpCbyiF12ALIueJuCfTGl8JO701jem6O6AsPMQsrAT48hm5JNBcfYOgcpOBPHNrPGNakobq9AsZKo-FI_HNpLjShHxBkPbf9TWfKrJ0C1ZDXAcTC68Xu6mIIequDV2V1dn1E0hDqSgGnXvh2gVDTO_x2gf8Wo3bxHiva6ZjsSGZyEFs8joF8vvZR1VHo6EIckprdUJM7yr71sbp4AhNzu-h5_Uex7cenFCIUUA17KiVNQ_oBusRpqLQCTPRKZ-2CjykX8pOx3S80HrqOvptJBhIaU9oUMEJactH8qMmDheqjeSIny6xGVein9dfMcJO5Nmfw8yR3crK7D2UJrl4siM7Yvixkpnh3fdjU61qfKxWeUT4xtYv1-azWYoZkEvs4MI-Pj1t9TgyppeHHk3rk1lAbjWXooaNGKaqalPZJvLp6pkgh8lQ4ZHuSfMkBTQIIT3KbXTBqfujxmuj2EkLYitpE_PlP2O9xweMX8VTG7xGkECKbety22Lwl4xbIhZRvEUnwvuBLXTUqgDfSJdrBZKpbRMkk54uD4oTyAot1salmARtISGvVr-_r6OT9s_hXiiR6XyyVn6uoNozcYSVBuW0fPjSWvOMxXFJmRuUW46NfpWVmRyFHARV6BU3sDbzC9p4xAU-OKhx-tN5uJxn3_3qxkbcR6l_1TuFzDVWC0)

## 2 Deployment

`/2 Deployment`

[Overview](#collie-docs)

**Deployment diagram API**

All the backend systems are hosted in AWS, only database it's hosted in MongoDB Atlas service.
CI/CD handle by jenkins & serverless framework

**AWS Technologies**: Route 53, CloudFront, S3, API Gateway, Lambda, Cloud Watch, Container Service, Code Build and EC2.

**Other main technologies**: Jenkins CI/CD, Dockers, Serverless Framework, Github hooks

**Scope**: A single software system.

**Primary elements**: Deployment nodes and containers within the software system in scope.

**Intended audience**: Technical people inside and outside of the software development team; including software architects, developers and operations/support staff.


## API Application

`/2 Deployment/API Application`

[Overview](#collie-docs)

![diagram](https://www.plantuml.com/plantuml/svg/0/TLLBR-8m4BxpAsOvxBPI5wHsUzbJ8VH1HRjieQhsX4mo1Gl7Zco7b5trl--CavHNUa4J-vlvldbuk79UM9-dglL5wbZb2SBI-ypzx7QjA3eBwPVvF7TeOwCzQj-9JTeLYPL2hrMUvTten_Un4je_FuowIdXqdevc0yoKsQJia77mrgZtvzVpTFOodDxDHjUtru-3azDMQmkRFPe4JoXuTWRjA7VUf6Y_EPXRKn1xcqvlZLaeX6XfwUuC7inVgPI06sdnrRorJ_y1j00YqYcaHdlYCa5U4wdPQomM2BqiKp8MNXhD0U_5ManYApCFGYVmX2BsV3wsPYqJT22K0lCAVedmckkO_OIIVWFUG5nfTB2MWY7IGe7pMd2dVTfwFqumDNfX1lEULy8HqqFux4FuPkgX41FAP2-FqgS_rDGg7UFMBJXKfyrqPVkuTi5WXoVCZ9FUM8dkaCdI7K5wu-4USjCSN1ISGkzbiYkSuXtY-Y9UeKu8L5abxJ5GPFAM9gWGcr84L5yrVbVg5XiPfIGIVAlyrefi-Nj4ijdflTN8faGwJtX2Hi5e8YaXlOmOp4qr0DNSk30tNOvq7mfGtxDTUW2DmPf6jrPHAJdKSNd1jJQvHxYyg5LiDIGc9OCWWs1m-A8eEkKnlyOGdwCtn4vmZShmangKrcUbn_YSGDVHULCPwF8UzKfgxdTbrSbn_QJEtzY8Xjrei9FkCKrCF_rSAXw6gBQRA3-0PLy_i51rk0eofNK3NoiQFjTP2fAVX59dm1-ya4fBIKqM-hZJwHpsv0dLHw6R9oiqABWnjX7poRGCzTgijgwxnTmjnzJAnQ8kgADLIvk47lOIugNG2twhLO3zqdn2EWdTKUWSt5YHOc7i2iQvMzBwhCDHvXmlhCamX7VJwJZCyWJZt29KAv-WZ6jcEbvEj4OJwicBbQ5Wx5hkbRqnkZDcnIAkQ1_G7yH_)

## CLI Application

`/2 Deployment/CLI Application`

[Overview](#collie-docs)

![diagram](https://www.plantuml.com/plantuml/svg/0/TLJ1Rk8m4BtdAxmSLaLgYLJjQK-5WDgiQ1THAhGdP9nHOk7OaUF0eXN_lZE9WG3X4isCvysRUV7ufNJSkYfNmJUfXQeIO9bpHVap32tV3LBficfTbM25qGwq6mYJXponakkjgeegZ7uypHJNxkjz6Yhke7GOMesXK6QV4w2Wui5q-EVtrsArZ1Tlg-daTV8nVkW7GN3EMtsO11voerCpNW-TukKZwxtNxeZLVWy3CUUVlVw_WB48--5IW_MOKQnn52tW3Ai1Fjhh1uTRkcOyJ7kj3GBCeJ2bTCPAAA-PB9vXIZIDBpBttSKJ8pPWvv3Aqjaz0iPrWA2pQgsaOCUpQvvB9DATIKz9Jt7EqpjZyHs9Drn-jYL3XkkyfR78WpcDqRHncmQ2oasYkjm4_uJ3ta-Di4-mMqaAD-ZRGPe1pjEZpuP5WRrJzY7e91NALCcIEv4HukHqiJWhqnHfZW44B9fG65cZBsHZEwaKMmFp86OqsZ87jjwpXEzFJT5t3ggZU7ieprDJ41MX3rrI9x05PGhIeR7kY_rSY_tSDIaU_WAzaPf-YBSOBkUsQM4gTVMtxYKEe_75A3VoucTKIPNKudYxY_AKwA_XqMN-GleY2rnyzjtJK5mNEPEqV4ezCdBeQMWi9JLQuCHWC6WrMUj6ahUdRFVP4dkAcm6QhItkTiP4ndLAwue5Q1-eIBEh5uAz6REX93fk_SJRzsCEFC5XbbOwyFcNCdGjwAmgCmG92_WACWqx9awNJlfTRQOhxnN0cqdRHLBUObz09_YK_WS0)

## Web Application

`/2 Deployment/Web Application`

[Overview](#collie-docs)

![diagram](https://www.plantuml.com/plantuml/svg/0/VLHDJnin4BtdLqmvj23HH89owGdO14WL84g2K4-HyGvP5w-zyWS1AlvxPxmRaWrHSzYCxUStpvutFlL1k11BtVcYZDGnHoX2gFpFNi-9PNUXGX4VeaSdhGbeGbVQiYTofuHvrh6AlUp7zx4M9jnTZtfQ1FI1fkPzhBHzBNb3nUITqTdlsxlP_7uukvgF1fU3c_x-GQUpXirlR8xxH5uTmbuMVR0bkcyU7fnTKlQzWxy07O2CL0XbqEtJ0iqJ-Bn1K7XfxK8ZP8MZtOTmRT-KrW8kbCD7-x9tq7d_dB8-8MzE0TDCiB9U1UiKUahSIkjeZI1dus4B-RgRN2mzW--d31uACMKwujl6NGne_S9H5XYOl05zXabjeyaJZczfFQfLyc-jL0fPu0I536TLkjJ-3Ql8U3g7HwNvS6dN-yva_fZGq-DTrFvuW_SyoYSCJ3qD8YZPKDEu2AK-X3yUXCb1-dMwz3T1lQsnnNldaKbkdLeeaxQ-xxgw4vOviJ4Wd7o8NKlDRKa1GVefOCRbSjcjfzdC3NDorpPtZi-eBOlfrz6AVnk8yeX0W-nerstHuYyqJygm5ve8oB7FjMb7oiINL9bXB-l_joIIFkTHwPpHgtXdxLUBvDDDB3I-RKXcrAtmjKd3ywOgWTG5eQbmFE1-hYEjs7GOPBVRROdaEcuUSLFaZ8gtM1tJq_j1_IoCB40MmYmQ0wQoCikgLjlEJTLDqEIPrjbQbXb7_q4DmO9Dte76eQb3cM7rT2JhNCrcuzIUKvJH8JJl7A4PMhTxgu9NrZwny5CqEJrj_m00)