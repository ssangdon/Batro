import "./Market.css";
import { Category } from "@mui/icons-material";
import Header from "../../components/header/Header";
import SelectSlider from "../../components/select/SelectSlider";
import { Fragment, useEffect, useState } from "react";
import ProductCardSmall from "../../components/product/ProductCardSmall";
import ProductModal from "../../components/modal/ProductModal";
import DummyItems from "../../modules/DummyItems";
let topCategories = {
    "씨앗": [
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8526592/85265929793.3.jpg",
           "uri":"https://adcr.naver.com/adcr?x=DS+9a95vB+cnLqabXwgDr////w==kbr13r5rLwiCVCW2jrAoLeMtbPiwFAKWoz6Neo+PaT9NSTxMt1tKUw44CISTL4FDLD3H9Gx8/ZtuoH7MgB7oH+cvtmHQj5avKB4OZY07q+tDLSBHSjwNgUelOREC9fqFRbMvV4JDwQimw9EAa5z4a6mYGEm8/jqU+3++bE9wQznQbMX94o295Yy53edcUNkSBpaF9Rrm/rEeJKSdc+aK6rJQ1hN7wQB/2/vRYI96dJleEianQ4ZkLMbheoEqLElC3ZI67ZPhdw6NiosiU8nOKee8OesMIHQvDZ2j2nckgMXUgKzbqTXnCSXDsfTVWQVA/2eI7zDmwIUoNoQVvqUdrJbjuULCPhhgCTADrYfKLK6/99u8njZtqVYMNsxH/FUGg4m4nIk79fbgRUlHHb3x3Qn2tPXVAHjYCauLbvGzIcjvG6J/yMfm0a1OeO5hPlWC69hhLy9L5OKjyO7T9oaGZuAvP+lK6r4U6A2wQl36z22AetcNaohd3H/YOyusDoxfrriLZXVQDKB6pyxfbRjQKnaL+dGhzvEnWMQ/fFld4wmlOhoLJUDnEP4kUZZzwPtwXqzFJABVOmEjLtj1qV41wfceiJXiiDlJu7qO6So99EUXXTt5dxzuZ+LxHe092s14SrRFLGbyLivz1LcnQGL7o/m3pAkFa48ZgG4jiRqm8UF75JbFA68eCKUzkHo2h+05caRrBxm9A8RcRTEft+3teqaXkFSM2Bb6YIWFRe1Tly//NR/XiOCh8Zap/Oi+2BDY2NMwPy/wUagTxv8L3iTfX2DcQp58CMr21wHCvA5y6mnt9fNrQ6t6In+FDibJBA+X9dWdY+KE/nw5QPsCpWnVhIP1df+agjg3jk/2gndkVxxTCF/f0rwbXgs+9PbiOZH498W/bjieAeH0bfV8KeRh8QYMgq7QKpLg0zuu7758EOLhD2ecvPQ1Fl2sxQ8X6tUG8FGkrzU1LIBoiUsacCXRmwezj2I0BPH10mtpSkCp5/yw=",
           "title":"\ud558\uc6b0\ud22c\ud31c \uc288\ud37c\uc548\uc0b0 \ucc38\uae68\uc528\uc557 \uc885\uc790 3000\ub9bd",
           "price":12500,
           "shopName":"\ud558\uc6b0\ud22c\ud31c",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8590047/85900472370.2.jpg",
           "uri":"https://adcr.naver.com/adcr?x=LILok+Tig28BD3QoThiisv///w==kQ0f6DVQsRdlGfnQ4nYV3wb+KsLGvZRG0WFlvJQwykozBSQvh1GWNCSuCQD0UHw0f00NAlTfd+Lla4C6EEMziMqc/bLjjWJHeAMuMCwRKkdlFsNzFV60NDI7uv386JaqFNLvZqw5QQywLT4BoJyPMLnQx5Pi7e/QIn8Lb8mrLIYqHQ5it1waFR8F9YuX8NxFTbzlrziXkDtSU5fNIDjbsDXMHWIA3FTILnRWmnafIJ7/znkrvHywTyEjbVhiKVnCCL7yuBpYg6geIcTIAN7BlEq/85XaDnaiH2IsUb54NXRCNMmgC8bCdsLc2pZur4I897OtemDgXuMWjoyouXeCrRClx+nxKo+GZ0LH6j6fOPqND9F2jhgPGfw0/CkGp56dKFk9mml353Q7Z93XrovQKotEArc3SYcyRlAtJ3kUDphZAR3PmqHZmBi3iwbhHbW/eduwyrMu7KGjIVvJx6hbC812T/g4LDOi9R8qXqiSkGENWFFYUG4Qlxl0HHSD6oEIfENYpWUEt4TjWZVLbIKeyYnvw58MvmfeQcLFUCOYtBa9w5KzcvhPadVrkhGE8Jo+fAQwZ8Xx4x5JS2j7EEweBZapXK+FLRGrLmm8gV7WwRPAxRv3E33aeL2PZAvD63RjvS0nk5dkZEi+dItfR9QrdvYiu1Rox+G/9lQjUZUicTTJOlp762yWGHBQ7a2yr++UDpO+Nk9Mv5t2AEDyQH1s/io4ogqu1OhqQJ8NJx//o6ZQF1VLUe95FmQ9g07LPshfPCqRneuwOTH9KMURph1C57hQT3Inj/DJecXAZwBFkzWXQLdD2/GDAnO8Aiis1lP0CeG571wQ1U2ypZhk98GoFQmxiFLvoluYQVqOiiU5u/p2WCAH5gyQX6DqGR46EhQ/YEBTzGpELxKeI9DpqC1mOW35fIX+QOcHbzbiP49bvAyC2LxUVxH52CRYygIhhBgQMbkkQcN8MH8ItpukocteEJxQ1QQ1Iv8igY91eyVEfhQ4=",
           "title":"\ud64d\ube5b\uc801\uce58\ub9c8 \uc0c1\ucd94\uc528\uc557 3g \uc528\uc557 \ubaa8\uc74c \ucc44\uc18c \uc57c\uc0dd\ud654 \ubbfc\uc18d\ucc44\uc18c \ud30c\uc885 \uc885\uc790 \ud143\ubc2d",
           "price":2000,
           "shopName":"\ub2e4\ub18d\uc6d0\uc608\uac00\ub4e0",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8559577/85595777693.1.jpg",
           "uri":"https://adcr.naver.com/adcr?x=T9OryvgvywzYMEQGUDHre////w==k9aCsBktseyFwSJF5S/fobxqk3gimCA8LfaIcAAsGblQ2KiuH+ud9mvh3XbfZn92KtZ4uFMx1ZjYTZtM7d2T4F0kgksJk4zOns/4GE+/9zq5kGUIfqJYgAQND6WXr/JDabKMpKW9Zea1TxEmz7wYh3g8pcxPJWDjkp00G6j+HfRW9M13Faq1sPlD/cH14xKz1Ruw6L9x5vt0dv358Cohvhjh+4F6gyLUPzTDLM52/75ZBQOrQ0YgCm+stNmIs8yWe2t9y2dB/TmyRODb4UplOCX8S38SIEhCuODu31imKOXVPhNoj6bE/PZau/+dIJUKDs9NsljPeaSld5BgIfWub3ecZKW1AorXu4eYVE7cANlr3OWH1G9IF1v3HmkYkqRoOTpVqYeV0Wa1xPc4JXNLQtFjMurjx2cnagjHbJaGc0oCSPP/K/aCcY9xxEgWl330NH3IU5gpIlGDXMycZT173LEFZOGx3ligzdsDEfyJX6bzp4stnP2nTlfYhMUZUArF6ukZqmSCfNiSTkUydq4c61E+ZN7ydZxrfOwchyoXn4uqHpAs0HPC89qU54+GprfQaQNdO+vIlfkcQ+xNPfoltCYWXU/IDzoV7SLf1h/p/xJtXf7RVyyxiPjWAI4RDp/b+DcS5LmJDcm9P/jwKwt9viukVp+uykbW5iPxlZ6hp2mclMgcP26iplEjwvUBagY84XmsWQwnSAEhfNxZowALeTdYUfeqVCiFsMsO1PojnTPykZXdgynnw4g7AhcXuSViYYaV0Qw9TSqcqPYtFNOd6HZ707lApZ2LQTEbcxCpKSPSXcyGGfphb2h4RkCa9HQcW36utuEqDNn5NWuvNIwdWH+oXljCVAFH5v5QUwGqQwmg=",
           "title":"\ud63c\ud569\uc885\uc790 1kg \uc591\uc794\ub514 \ubc95\uba74\uacf5\uc0ac \uc0ac\ubc29\uacf5\uc0ac \uc11c\uc591\ud480\uc528",
           "price":14000,
           "shopName":"SEEDPARK",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8546789/85467894862.4.jpg",
           "uri":"https://smartstore.naver.com/seed1558/products/7923394539",
           "title":"\uaf43\uc528 500\uc885 \ubaa8\uc74c \ud63c\ud569 30\ub9bd \uaf43\uc528\ubab0 \ub2e4\ub144\uc0dd \ub178\uc9c0\uc6d4\ub3d9 \uc57c\uc0dd\ud654 \ubd04\uaf43 \uaf43\uc528\uc557 \uc885\uc790",
           "price":2000,
           "shopName":"\uc528\uc557\uacfc\ubb18\ubaa9",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8499330/84993305111.2.jpg",
           "uri":"https://smartstore.naver.com/moyamogardencenter/products/7448804789",
           "title":"[\ubaa8\uc57c\ubaa8 \uaf43\uc528] \ucc9c\uc0c1\ucd08(\uc6b4\uac04\ucd08) 3\uc0c9\uc0c1 50\ub9bd \uc528\uc557 \uc120\ud0dd\uad6c\ub9e4",
           "price":2000,
           "shopName":"\ubaa8\uc57c\ubaa8\uac00\ub4e0\uc13c\ud130",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8241533/82415339771.jpg",
           "uri":"https://smartstore.naver.com/plant_mk/products/4870816311",
           "title":"\uc720\ub7fd \uc791\uc57d \uad6c\uadfc \uaf43 \uc624\ub9ac\uc9c0\ub110 \uac00\uc744 \uc219\uadfc \ud0a4\uc6b0\uae30",
           "price":9000,
           "shopName":"\uc2dd\ubb3c\ub9c8\ucf13",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8439757/84397577514.1.jpg",
           "uri":"https://smartstore.naver.com/hsflower/products/6853077192",
           "title":"\uc720\ub7fd \uc9c0\ubabb\ubbf8 \ubc18\uac12 \uc81c\ub77c\ub284 10cm \ud654\ubd84",
           "price":2000,
           "shopName":"HS Flower",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8525552/85255528421.jpg",
           "uri":"https://smartstore.naver.com/jujuseed/products/7711028099",
           "title":"\uc720\ub7fd\uc0c1\ucd94 \uc528\uc557 2g \uc720\ub7fd\ud53c\uc548 \ubaa8\ub4ec\uc0d0\ub7ec\ub4dc \ubc84\ud130\ud5e4\ub4dc \uc0c1\ucd94\uc528 \uc308 \ucc44\uc18c\uc528\uc557 \ucc44\uc18c\uc528 \uc0dd\ucc44 \ub864\ub85c",
           "price":4000,
           "shopName":"\uc8fc\uc8fc\uc528\uc557",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8297041/82970416386.28.jpg",
           "uri":"https://smartstore.naver.com/nongsamt/products/5425922566",
           "title":"\uaf43\uc528 \uaf43\uc528\ubab0 \ub178\uc9c0\uc6d4\ub3d9 \uc57c\uc0dd\ud654 \ucc44\uc1a1\ud654 2000\ub9bd \ubd04 \ud30c\uc885 \uc5ec\ub984 \uac00\uc744 \uaf43\uc528\uc557",
           "price":2000,
           "shopName":"\ub18d\uc0ac\ub9c8\ud2b8",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1005377/10053770032.1.jpg",
           "uri":"https://smartstore.naver.com/seedfarmkr/products/436099481",
           "title":"\ud63c\ud569\uc885\uc790 1kg \ud480\uc528 \uc794\ub514\uc528 \uc794\ub514\uc528\uc557 \ubc95\uba74\ub179\ud654 \uc0ac\ubc29\uacf5\uc0ac\uc794\ub514",
           "price":16000,
           "shopName":"\uc2dc\ub4dc\ud31c",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8414052/84140529130.jpg",
           "uri":"https://smartstore.naver.com/flowerpretty/products/6596028808",
           "title":"\uc5f0\ud551\ud06c(\uc0ac\ud558\ub77c) \uc791\uc57d\uaf43 1\ub2e85\ub300 \uc0dd\ud654(\uac15\ub0a8\uace0\uc18d\ud130\ubbf8\ub110\uaf43\uc2dc\uc7a5 \ub3c4\ub9e4\uc2dc\uc7a5\uc5d0\uc11c \ubc1c\uc1a1\ud558\ub294 \uc0dd\ud654\ud0dd\ubc30)",
           "price":14000,
           "shopName":"\uaf43\uc608\uaf43",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8241472/82414729709.5.jpg",
           "uri":"https://smartstore.naver.com/qgarden/products/4870206249",
           "title":"\uc720\ub7fd \uc791\uc57d \uaf43 \uad6c\uadfc \uc219\uadfc \ub178\uc9c0\uc6d4\ub3d9 \ub2e4\ub144\ucd08 \ud0a4\uc6b0\uae30 \ud050\uac00\ub4e0 \uc9c1\uc218\uc785 \uc624\ub9ac\uc9c0\ub110",
           "price":9000,
           "shopName":"Qgarden",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8548499/85484999626.1.jpg",
           "uri":"https://smartstore.naver.com/alldayplant/products/7940499303",
           "title":"\uce7c\ub9ac\ube0c\ub77c\ucf54\uc544 \ubc00\ub9ac\uc5b8\ubca8 \ubc00\ub808\ub2c8\uc5c4\ubca8 \uc288\ud37c\ubca8 \uc0ac\ud53c\ub2c8\uc544 \ud398\uce04\ub2c8\uc544 \uaf43\ud654\ubd84",
           "price":3600,
           "shopName":"\uc62c\ub370\uc774\ud50c\ub79c\ud2b8",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8301340/83013400600.22.jpg",
           "uri":"https://smartstore.naver.com/jujuseed/products/5468906113",
           "title":"\ucc44\uc18c\uc528\uc557 \uc308\ucc44\uc18c \uc885\uc790 \uc0c1\ucd94\uc528\uc557 \uc6f0\ube59\uc801\uce58\ub9c8 3000\ub9bd \ucc44\uc18c\uc528 \ubd04 \ud143\ubc2d \uc0c1\ucd94\uc528 \ud30c\uc885 \uc57c\ucc44",
           "price":2000,
           "shopName":"\uc8fc\uc8fc\uc528\uc557",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8309676/83096766665.jpg",
           "uri":"https://smartstore.naver.com/daenongseed/products/5552270910",
           "title":"[\ub300\ub18d\uc528\ub4dc] \ud751\ud558\ub791 \uc0c1\ucd94 \uc528\uc557 50\ub9bd",
           "price":3000,
           "shopName":"\ub300\ub18d\uc528\ub4dc",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8289987/82899879777.3.jpg",
           "uri":"https://smartstore.naver.com/qgarden/products/5355386808",
           "title":"\uc720\ub7fd \uc81c\ub77c\ub284 \ubfcc\ub9ac \uc219\uadfc \ud050\uac00\ub4e0 \uc9c1\uc218\uc785 \uad6c\uadfc \uacb9\uaf43 \uc5ec\ub984\uaf43 \ud0a4\uc6b0\uae30 \ub178\uc9c0\uc6d4\ub3d9 \uc624\ub9ac\uc9c0\ub110",
           "price":7000,
           "shopName":"Qgarden",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8385390/8385390231.7.jpg",
           "uri":"https://smartstore.naver.com/czmart/products/285133132",
           "title":"\ucd5c\uc2e0\uc218\uc785 \uc81c\ub77c\ub284\uc528\uc557(5\ub9bd) \ud540\ud1a0-\ub525\ub85c\uc988",
           "price":2000,
           "shopName":"\uc528\uc81c\ud2b8\ub9c8\ud2b8",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8242654/82426544430.jpg",
           "uri":"https://smartstore.naver.com/jwonstore/products/4882020959",
           "title":"\ubbf8\ub2c8 \uc5f0\uaf43 \uc528\uc557 10\ub9bd",
           "price":6500,
           "shopName":"JWon Flower",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8261760/82617607687.1.jpg",
           "uri":"https://smartstore.naver.com/sovelyfarm/products/5073086036",
           "title":"\uaf43\uc528 \uaf43\uc528\ubab0 \ub2e4\ub144\uc0dd \ub178\uc9c0\uc6d4\ub3d9 \uc57c\uc0dd\ud654 \ubd04 \ud30c\uc885 \ubc31\uc77c\ud64d \uaf43\uc528\uc557",
           "price":2000,
           "shopName":"\uadfc\uc18c\ud143\ubc2d",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8389207/83892078454.8.jpg",
           "uri":"https://smartstore.naver.com/jihongye/products/6347578132",
           "title":"\uc815\uc6d0 \uc0b0\uc18c \ubb18\uc9c0 \uc794\ub514\uc528 \uc885\uc790 25g \ud55c\uad6d \uae30\ud6c4 \ucd5c\uc801 \ub4e4\uc794\ub514 \ucd08\uc6d0 \uc794\ub514 \uc528\uc557",
           "price":4300,
           "shopName":"\ub18d\uc0ac\ub18d",
           "platform":"naver"
        }
     ]
    ,
    "농기구": [
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8089524/80895243825.3.jpg",
           "uri":"https://adcr.naver.com/adcr?x=KDdlglv4wLN3HHVMGPz0Bf///w==kC44OZC/oNmETiQxjH4KW5rGvyEII/kQDjjyD7tyZK3U64+K1ySG5UHFrOvsb8jNBpTcAnhy0gTxZ4SM4qawNChnGEO7shv+OTP9lyZ6vas0+Gp/+EJLtCXTz1NXXCUAEVBAEYkDNpI0MGauWbmWm+O97VgtR6ARAXDcQiFk7q2/Syl05GPcIDy50ljlM07Am5Qv4I0UnJsj9i7QaC7GSIYG/vam5LaQFkm1LDRE6EnPmUtlKj3WZSICcbyds+GwtQ5EU/yUBOjYY2az5Bkas5eolvrBZVYm4MwBsVvREnRe2dcBDkUd/wzg49wHQzZYxomefwLU0vcjfM1q/BoP4W6JyGMhJCxXA/2leBNHmaMyxmBJuTO9UNmwGvg6WY2GZo1En3gwwkCmbmD431NtTWvq6VCHlUdtIMj2tkFRv1lRzLvbNp0x5WVJy6LsVdgN9npG3kSW7P+VesY+LT8ZpWo2OO410YGecJUyXep9jQHAb7/TRdB2s/LEi/0sh1xccv6W71rP0+kd7WVW907UQYQa4rFBhC3EiO6AJzfNejdeia0cDmzsNARXEn0UKYaeHRYORpiViqCO3v6HKC1Wag5UoFAs30pSahwelslMEU8qRR/q49CvOJG4Q+RoIZAurE0E5PgL6cHCWazVzGcfEfQzNdJ6CCG58gkaa+4OJcYidfalWXpkHtIRAY6FmtC56DfJ5XCmIapGGYrKSvhcKbi+4P1A9xaS97eyyyQqtwz9F++MK4Vj8NjnYLdV/mnYl1S3wt5yU08e/kHiswin6pM6r08TWt6PpxF4/yOSYYygp4PkWDvSgT9ThZ81QpI4cewdHuimFgI0aiXUq0J+yV0nEyP/TA70KaTg+MNqwZcqwvwJZ3TIXrd9AZDK4auh70vZj9A+/Q0wQ0dD3n0SKWA==",
           "title":"\ub9ac\ube59\uc5d4\uc824 \uc81c\uc124\uc6a9\ud488 \ub109\uac00\ub798 \ub208\uc0bd \uc5fc\ud654\uce7c\uc298 \ub4f1",
           "price":7900,
           "shopName":"Happymart",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1069352/10693521112.6.jpg",
           "uri":"https://adcr.naver.com/adcr?x=vNCUO3wohRkEXWIhwvJFRP///w==kGfPqqnOuPjXbniswCuMqsvdmt12Z2dQRRjsJlqyVHWsJDRdOnGei1mnSlZ/1ss4HUV4i2beIPUOgQzbRiieFddvyvqLagGJTFwDnBYn196DazZ3D2zob0py47Mff/ooKdw/gtdSN8+OKlA7w8nZ954t3uTxf33vFupX8C5X8xy25AdDDPl4vLhbUn2JqqZBy/59/WwJHGwBBF0ycWF+DqTfxKaPnx5h08zXX/y3lcnLox1VY1kC1k9JqGWe+3Q3LJzE9TKV1Ub+jcpcOVpldzz2oWZajBNjLRdwHJDZVuH6SlSf3PtcLt44SYYk3/C4J0GkdSx53tsJHrWIKKJp8pRrt6pYYk4ARy5JfGnDmOLN3o6ris3F/dmSg/yRZTR2uByuFQpV8DCCDlQiP6ZMr7v8ks7g3pP9c7MQaCc6M7fgBe//g+FWgIl97AoILj+zskTQWoIlOrHqSo+yi9lIfmAKOORV2EuRTsN4QfJWoZR2NUHHUXdjwKdh8TJHetre7vMbqBoOepeYi8mcSC3LpWOFXBwh5xJIPRHMezTkkVXmCVcjsa8KN7bILJsm116eXTm+oHOJmezyL+y+GNEYK4AK2snX/QjrpdwGjHwbm9ZQjV4ZLUkQHeV9PKaQ+5aZfL7RHRpwzbO5ONB9Xz3z5xBLQG4m+tstdzAiyQrhUu3IIZKA9WV6WO2ENjYbUJKspVUlUYfqfcXh7PpgDBvnqMO8tMkyy4mfkKDJzNqCd9NsOXyhVXyLn7YSS0CeqsbOoGVarqL/3abNUnClPkkN9JZcaeZ0V8iJhyyOHryzeueL2X7yYgNPinJWvAoWrMvWbJgod6plco1hpv+Jf2NrFL8rAVswNGUsQyyYFrLU1I0sP7mw86BZj+qKUcyKjJu9+j9WA0bpDaRsg8aRpakWmyw==",
           "title":"PVC \uc54c\ubbf8\ub284 \ucca0 \ub208\uc0bd \ubaa8\uc74c\uc804",
           "price":7900,
           "shopName":"Happymart",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1122832/11228324222.11.jpg",
           "uri":"https://adcr.naver.com/adcr?x=u3z8Sc7CJ0zMX8aEHR+MPf///w==kOZlXz5QtPAuMTEaD2ROCve33owmmjVfpn2fx9+GDROM1q5/XIy2YwDcwJOcs/sCLBNKdabs7XARJS8E84Sd5QWN7DGQEOcPlc9RsnQieU3Lc8R1vK98QamNPQ3Q1JLynJ0zbwCc0jGryFETVwOp8vdQRrWwQVcgIPIVTt5niX5GrTjP2K0m1PyqcQ/Zpwtq9n0/t7EizqMeXqnyqA24js2Lqa5BU5l4gPgNhJQNiH0pRNATevk/mEE1OZIZeTbXB0lgw9EUyemFT5wunMzt4hs2L5DSlL1ZtL5H4tBPy6h+EsytBOTLuW4h1dh9/TlOjTsQ7hfu02LsR9iqPKsPDvy7ts3Nkwi73Ba/knCMo5ORw6IPHUmc43EKKhzVXzrk/TDU2EAp7d3UZTOQJHiB6UImSvbfCVKaphkJlC+3Cbihcmbda3J89+0LCFZqIWb9iVmS/P22GJhCTr11X20Ru24lGMyhNKOUOhtEFWZvJZGUQOdnTsk+F/nVFokTvifZ+dYMJ2BukuRd87owc5BhBcQ0ajV5WK3hovYqPlDFQDo2vh5kEMxN8YsdUHPMD9p1de6GFQPu6Wvb6ykwwRHrVbBt97VZmgfbIAfEPLQdQJHRljNkRxMdsVqzZSEXHLu4u4TmODzRZjYv7pVsjEymaUJ5MiLAC6lwpclDJ54k0rm/jTl956ORzfjdRZ4b8te4JZSB09R5mMgu4yLZVRmylM72Ng6q2xc710Xl8h7fRjnkh8jNcZSg/ABOjsBuEL7f2kdJOOVOq4EgnBcD1d/jNdwHK5B1+ENXlk29ycUtkjQmELmf0VQaojsjzNo9773qmrsoUI9ZRLrtM2vlrw5BxcTxLJqq+HcQQnmGoTSuumwVhk39uiZVjqcFsCqx5udNINVT5M5fjJXpMnCS2KqC62n5ibLkKVMVSoMSiYUUY89vwtor1Jzooa3R6V0jomtOeYJD7HO4Tnhk4pVrSZEOChSZNJsRGGJceu9kprheEnEmAKxsT3cccbHSF2xKqWVpz",
           "title":"\uc0bd\uc1e0/\ubc2d\uac08\uc774 \uac1c\uac04 \uc218\ud655 \ub3c4\ub77c\uc9c0\ucc3d \uc1e0\uc2a4\ub791 \uc7c1\uae30 \uad2d\uc774 \ud0c4\uc18c\uac15 \uad6d\uc0b0 \ud143\ubc2d \ub18d\uae30\uad6c \uc7c1\uc1e0 \ub85c\ud0c0\ub9ac\uc0bd",
           "price":83700,
           "shopName":"\ub09c\ub85c\uacf5\uc791\uc18c \ub18d\uae30\uad6c\uc138\uc0c1",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8272382/82723826317.3.jpg",
           "uri":"https://smartstore.naver.com/acne110/products/5179305168",
           "title":"\ud6a8\uc2ec\uc0b0\uc5c5 \uc2f9\uc4f8\uc774\ud638\ubbf8 \uc11c\uc11c\uc7a1\ucd08\uc81c\uac70 \uc7a1\ucd08\uc81c\uac70\uae30 \ub0ab \ud638\ubbf8 \uc81c\ucd08\uae30 \ub18d\uae30\uad6c \uae40\ub9e4\uae30 \uc81c\uc124",
           "price":38000,
           "shopName":"\uc790\uc7ac\uc2a4\ud1a0\uc5b4",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8461809/84618095138.1.jpg",
           "uri":"https://smartstore.naver.com/genie_farm/products/7073594816",
           "title":"Y\uc790\uace0\ucd94\ub300 A\ud0c0\uc785 \uace0\ucd94\uc9c0\uc9c0\ub300 \uc9c0\uc8fc\ub300 \ub9d0\ub69d \uace0\ucda7\ub300",
           "price":2700,
           "shopName":"\uc9c0\ub2c8\ud31c \ub18d\uc790\uc7ac",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8306694/83066943577.4.jpg",
           "uri":"https://smartstore.naver.com/jajae1/products/5522448114",
           "title":"\uad6d\uc0b0 \uce74\uc774\ub85c\uc2a4 \ud55c\uc190 \ubaa8\uc885\uc774\uc2dd\uae30 \uc18c\ud615 \uace0\ucd94 \uae68 \uac10\uc790 \uc591\ud30c \uc528\uc557 \ubaa8\uc885 \uc2ec\ub294 \uae30\uacc4 \uae30\uad6c",
           "price":64500,
           "shopName":"\uc790\uc7ac1\ubc88\uac00",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8385326/83853263323.7.jpg",
           "uri":"https://smartstore.naver.com/genie_farm/products/6308760834",
           "title":"\uace0\ucd94\uc9c0\uc9c0\ub300 \uc5e0\ubcf4\uc2f1 \uace0\ucd94\ub300 1.0m \uace0\ucda7\ub300 \uc9c0\uc8fc\ub300 \ub9d0\ub69d",
           "price":350,
           "shopName":"\uc9c0\ub2c8\ud31c \ub18d\uc790\uc7ac",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8176783/81767836636.13.jpg",
           "uri":"https://smartstore.naver.com/wonangplay/products/4223315159",
           "title":"\uc791\uc5c5\ubc29\uc11d (\uc77c\ubc18\ud615) \uc18c \ub18d\uc0ac\uc758\uc790 \ub18d\uc0ac\ubc29\uc11d \uc5c9\ub369\uc774 \ubc2d\uc77c \uac2f\ubc8c",
           "price":3990,
           "shopName":"WA \uc6d0\uc559\uc0b0\uc5c5",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8174407/81744070152.5.jpg",
           "uri":"https://smartstore.naver.com/farmt/products/4199548725",
           "title":"\uc774\ube68\uc120\ud638\ubbf8 /\uae40\ub9e4\uae30 \uc81c\ucd08 \uc7a1\ucd08 \ud480\uc81c\uac70 \uc911\uacbd\uc81c\ucd08 \ud638\ubbf8 \ud480\ubfcc\ub9ac\ubf51\uae30 \uc62c\uc2a4\ud14c\uc778\ub808\uc2a4 \uad6d\uc0b0 \ub18d\uae30\uad6c",
           "price":34200,
           "shopName":"\ub09c\ub85c\uacf5\uc791\uc18c \ub18d\uae30\uad6c\uc138\uc0c1",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8591280/85912805049.jpg",
           "uri":"https://smartstore.naver.com/uammall/products/8368304726",
           "title":"\uace0\ucd94\uc9c0\uc9c0\ub300 \ub9d0\ub69d \uace0\ucd94\ub300 \uace0\ucda7\ub300 \uc2dd\ubb3c \ud654\ubd84 \uc9c0\uc8fc\ub300",
           "price":150,
           "shopName":"\uc6b0\uc554\ubab0",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8010539/80105391316.5.jpg",
           "uri":"https://smartstore.naver.com/good_st/products/2607647740",
           "title":"\uace0\ucd94\ub300 \uace0\ucda7\ub300 \uace0\ucd94\uc9c0\uc9c0\ub300 \uc9c0\uc8fc\ub300 \ub9d0\ub69d \uc5e0\ubcf4 1m",
           "price":350,
           "shopName":"\uc870\uc740\uc5d0\uc2a4\uc564\ud2f0",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1142185/11421851549.5.jpg",
           "uri":"https://smartstore.naver.com/homicom/products/737492614",
           "title":"\uad6d\uc0b0 \ubaa8\uc885\uc774\uc2dd\uae30 \uc18c \uce74\uc774\ub85c\uc2a4 \ud55c\uc190\uc774\uc2dd\uae30 \uac10\uc790 \ud30c\uc885\uae30 \ubaa8\uc885\uae30",
           "price":17500,
           "shopName":"\ud638\ubbf8\ub2f7\ucef4",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1122835/11228356101.10.jpg",
           "uri":"https://smartstore.naver.com/farmt/products/691250514",
           "title":"\uc7c1\uc1e0/\ubc2d\uac08\uc774 \uc7c1\uae30 \uc1e0\uc2a4\ub791 \uad2d\uc774 \uc8fc\ub9d0\ub18d\uc7a5 \ud143\ubc2d \ud0c4\uc18c\uac15 \uad6d\uc0b0 \ub18d\uae30\uad6c \uc0bd\uc1e0 \ub85c\ud0c0\ub9ac\uc0bd",
           "price":89100,
           "shopName":"\ub09c\ub85c\uacf5\uc791\uc18c \ub18d\uae30\uad6c\uc138\uc0c1",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8582383/85823837636.jpg",
           "uri":"https://smartstore.naver.com/shbiz/products/8279337313",
           "title":"\uce74\uc774\ub85c\uc2a4 \ubca0\uc2a4\ud2b8\ud30c\uc885\uae30 \uc528\uc557 \ud30c\uc885\uae30 \ubaa8\uc885 \ud55c\uc190 \uc774\uc2dd\uae30",
           "price":87700,
           "shopName":"\uc5d0\uc2a4\uc5d0\uc774\uce58\ub18d\uc790\uc7ac",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8270459/82704598469.jpg",
           "uri":"https://smartstore.naver.com/acne110/products/5160077466",
           "title":"\uc190\uc26c\uc6b4 1\uc778\uc6a9 \ube44\ub2d0\ud53c\ubcf5\uae30 \ubb34\ub3d9\ub825 \ube44\ub2d0\uba40\uce6d\uae30 + \uc190\uc218\ub808 \ud6a8\uc2ec\uc0b0\uc5c5",
           "price":86000,
           "shopName":"\uc790\uc7ac\uc2a4\ud1a0\uc5b4",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8419689/84196898251.3.jpg",
           "uri":"https://smartstore.naver.com/sosoryland/products/6652397929",
           "title":"\uae68\uc2ec\ub294\uae30\uacc4 \uc218\ubc15 \uc625\uc218\uc218 \uace0\ucd94 \ub4e4\uae68 \uc2ec\ub294\ub3c4\uad6c \ud30c\uc885\uae30 \ubaa8\uc885\uc2ec\uae30 \ubaa8\uc885\uc774\uc2dd\uae30",
           "price":24900,
           "shopName":"\uc18c\uc18c\ub9ac\ub79c\ub4dc",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8210020/82100202401.9.jpg",
           "uri":"https://smartstore.naver.com/taiso/products/4555682349",
           "title":"\ud734\ud15c \ubc2d\uc77c \ub18d\uc0ac\uc758\uc790 \uc548\uc21c\uc774 \uace0\ucd94\ub530\ub294 \ub18d\uc5c5 \ub18d\uc0ac\uc6a9 \uace0\ucd94\uc758\uc790",
           "price":22000,
           "shopName":"\ud734\ud15c",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8290463/82904632102.6.jpg",
           "uri":"https://smartstore.naver.com/nongdal/products/5360139135",
           "title":"\uc601\uc8fc\ub300\uc7a5\uac04 \uc11d\ub178\uae30\uc7a5\uc778 \uba85\ud488 \ud638\ubbf8 \ubbf8\ub2c8 \uc8fc\ub9d0\ub18d\uc7a5 \ud143\ubc2d \ub18d\uae30\uad6c",
           "price":9000,
           "shopName":"\ub18d\uc0ac\uc758 \ub2ec\uc778",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8251739/82517395576.5.jpg",
           "uri":"https://smartstore.naver.com/speed-77/products/4972875252",
           "title":"\uc2a4\ud150 \uc120\ud638\ubbf8 \uc7a1\ucd08 \uc81c\uac70\uae30 \ud480\uc81c\uac70 \uc7a5\ub300 \ud638\ubbf8 \ub2e4\uc9d3\uae30 \uc2a4\ud14c\uc778\ub808\uc2a4 \ub18d\uae30\uad6c",
           "price":17900,
           "shopName":"\uc2a4\ud53c\ub4dc\ud234\ub9c8\ucf13",
           "platform":"naver"
        },
        {
           "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8326475/83264750544.2.jpg",
           "uri":"https://smartstore.naver.com/koala496/products/5720251968",
           "title":"\ucf54\uc54c\ub77c \ub9c9\uc0bd J1-7WY \ucf54\uc54c\ub77c\uc0bd \uc0bd \ub18d\uae30\uad6c \ucca0\uc0bd \uc54c\ubbf8\ub284\uc0bd \ub18d\uac00",
           "price":6900,
           "shopName":"\ucf54\uc54c\ub77c\ub18d\uae30\uad6c",
           "platform":"naver"
        }
     ]
    ,
    "의류 장비": [
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8025226/80252264524.1.jpg",
         "uri":"https://adcr.naver.com/adcr?x=zaa0L4KFjyrkjHb6VBQdZP///w==kILhqs4Ay+ZY1it9Q+4GqY3Jx/AmC7531xFHhTrCb7vPS7lh1WlQLmmyGNc+o79yRrPvZJQnOiPE5677SE8cGKYB2vCNbrO3/BDxb+qwTd3fzn2m2gEs93XFITF70yXFzpQSzFP26wNvRZXBL3XNO+EAI7OeOCC+60X35oadcM8bgV0Y8/dgOTjIe9gXog4H3/qrnSwGSQdubG2TUC8NT8jjdv+Qu43EJSzLNDpYpw0KIjB2N/qZDO/pmGxoWsnv1lvH1PBvX9l7aaaJ04VOXJ0d2d2TwbSlXQMv8FSnT3VuCBmtrDbsYDNKRjh7qm4wnTT8CVRof3adqF9zH7Frnce7aVzWAFz4QUwN6RUkBsXjZrb6bSlTNiQsiCv150O/Z9X2kmIVSHSAcu1i6d+y8Y+c8Z38JnBYdeq9qI469qGSmHk+HKpS9Gojd4DObLChwthGQ4XTjjroKNT364dZc95C+DxJE6bKnNNZ5tZuHD+N+OvjXF2lhLTIiw6gBxz2POFHayn26U9iVXxsV9KSd429WV6oqTuftTq+Js6HwhwLYuEI7/L6RcYGqyvFC6OgOJ/7Ahc1sdSmtmxQEwB8gyYehQ89Vy/279TGGY/txYUMXY1rNwvsNin1tfO4x5OGEl/u3b4CxxZyCO1bbWoCdjZW4PwO+4+jUVubY20YbVfRSTcKTYCKiHBRDnfqD/J9JFN+yiMFFSi8twi64xJ8m3SBzIf7dlD2LproUEY1pyaBiGZZ/mmjVDjnCEVLsdRUv0dPHFt+9JPvrevGihGMmUFX7r8WlPJFBtEof9dVr5K8mHH4zvxgmjYWzhiUn4gx/IjylZ4zU9lCIYmeE7NO8LytWzqHdqnRg4LyRfDd6Z/wzU2LX6LuhSPrAPIJlOS3Y39DGlx42pEDi9wb5TDkfv4FDRQlbIRLrGmJ9uPokLW8tg1xXwSKo8PRg4p0ap4sQ0Cu3MaKmBnn6vQAexDGAWEO4W/xphj1IwT3VD7MK3CYq6nb0Q2Ob/cRgpdwYxiuRmi5pnFX68xkY+MQ6C5j40/pmIJ/osaTbeYXGJbE+YFNA0VT8UUsZCJcPTfAyYxIjzsNyIJ/6a6IU6HwwR//YTz7tGVqCz2M2OGmc2W7HQfhAYUjlZae36Hr3yd1r7q4b",
         "title":"\uaf43\ubb34\ub2ac \ub18d\uc0ac\ubaa8\uc790 \ub18d\ubd80 \uc790\uc678\uc120\ud587\ube5b\ucc28\ub2e8 \uadf8\ub298\ub9c9\ubaa8\uc790",
         "price":1990,
         "shopName":"\uc5b4\uc378\ubc14\uc6b4\ub4dc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8603988/86039882629.jpg",
         "uri":"https://adcr.naver.com/adcr?x=WRZKQ34Gk2OLGduDMIMCn////w==kWimQt0cMb0GW/pYJFJHaJ6bBhQaZs2lFpjKzjb7RMFkHmmJtZKVH3sQwPYoBto5G9C046T/O3MOe56nwED6JU/CCaDbWKRpOWquMyxQTB94VhdM5md7HfRaws81s3Rk1qQMSW8D6tStHqz0yIqw73Rzq1yCpvb99Mj3ChAVRV4lCxru+qL3eXyJ0ILxhlsAkQzumduH2CjvERX1gX1snbqg0cuZrAMAnqZg2WlC5vc50XLo5PTqdPRi1g5lC8zJtfCcudNA6zO+2I457hXBSELnwhgX80ikRJIZgdB89eDTYEc1OjJbMu1e8tNK0qCTQx55Ff+8nIY7H8DQ5G/TLvJQmldH3HfX/BRhXXWosxmF+lgTNFOxDd2Now4dxs4Ca46U5ZrO+8lNFPuBEmP8EwF93V7bqfAdcw/m7qIAc/DTwgAjya9mtLG4s7GTvYtDNMWGv/O2HERwri2snYlC159wKD8Xf3mTH4azCU+j8HK9w9hv6Akx3hRbXzbFCGgn8UjDmcjy5k1XoaETOgF30k/YOjbpnzQHxaRyoImIMT+pjgFXOdSH1Vsnu++MiUa3V8uhN4EQQQrwqXmZIzhp4eJrPRAUCQMe+oS1XahDXym9wOteqisVm6UWZcMnlbYbLZLNRrg/lM4uEhypTSZ/W4Sp20rzESBm1wNM/Ot/0cvE5GJsRSynjmuIIFTvQEOXwRSfr/ZBxZ3SSLy90dFFzytWRWRx3O0sf5Pl/jXVGa7QGlPRsRNX5V55rJeLv0ORLt4yNmqCXK88uAWi9EXT6S+Nb0EUq28yuILQ9ff2LfQn+BbqUkaGXUIovAjMAJsBqjzUjk4aWff54tK/MGr8psxrBy6dTA+X/0WW+vCiQPRJlc45TRMTqF2zet+H35bK+YCXP/xIJsws13KjxUAe27g==",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ub18d\uc0ac \ud587\ube5b \ucc28\ub2e8 \uc131\uc778 \ubb3c\ub180\uc774 \uc791\uc5c5 \ubc2d\uc77c \ub18d\ubd80 \ub18d\uc0ac\uc6a9 \uc77c \ubaa8\uc790",
         "price":10900,
         "shopName":"\ud50c\ub85c\ub798\uc378",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8319023/83190237127.2.jpg",
         "uri":"https://adcr.naver.com/adcr?x=Xr3Pa5GoYuqw3p45eixcl////w==kfxj5IEOiJ+Pol0EstLmL/SUdo3ZdV8T7QY0vFfS0mQcEYTv7M3JFwFbkVa7X/oEggGa9NYb0UP6r6T1R9T3+E5QLg6vZvTdUQUhc+fcaond/+w4NlzenPQrAymTBzw7cQMLGP4+aqKWi5/kzzxlzwyTRGZiw+jsJ0eKNW4nAr12cpk/F1+BViqvwvfUtPzRmPELRwCsvtdSDaAINv5z8qWJVZlNfqFmpyrs91ar83BiGMUXfX/dmloFIgrMXwZISBeyiVQJSl9PIWv2mHkMowErxObaOlV78WfxgTrimNVoZ9IKyyCcqgznZKksqVbr0iOxTJNeBcib73T0EZzLfU7rz117LTiQgpE020Y1P6unlcsNquxTBPG1MYxENIz/nOOZKeNn9atAJtOc97G4TFC/EyepUPdwt4Dk7ah9Hhe/8CHmej808zRpvUw+3YaLRbjKpgV8oDtbkz8zFbjP7GyVne4rQTBFlta4S+pPk8ht2swTi1d2WIMVutk4+uH4FTAkYBg9hKgmuTSIvPNcQjipU2AyIYJleOYul17blMmjv0ga1H7BQn7yCvOHQWZwHfSLDzZB9BGQn8P6MG0nku4+y8GAMIJlOvfg6UpuFzHU26kqcVc5ZJG5dV7dM/Q+c0Nu1jSS+9cY/aZB8qDBBYAC6WTErQ8c6WF3fabMejRidnV0IiiSNb7vKIyRmKyI7to+EMCY6GGI5QQjLKRo5Z7mEx76Ex7cwYn5zzbPKLH9QiMTTHn4ibK6cd/x0Rc4HkJQnoOzYV27/N7GGBh1zV7W02EoTtsEmaYqXajhBCwbfgjAY+RlQ2V97UFoWGhjRaQ6e2qVu+0NAz9nR3gT/M0G7DgLEcRodp3w6IyoQbtSwBj2wcs6KflyoANiExrw8YD1PM0e0rAcqFe8ry2thPeqr9xbbYyx42qvgraYFbAEmZ4fhTzweszakRC4PC1IKNVrLUM7/npQG9KorDyB1wclKMZQQyguEwFj2vTDJT1+q7JycvWxTprSWrrmlPbUP",
         "title":"\ub18d\uc0ac \ud587\ube5b\ucc28\ub2e8 \uc790\uc678\uc120\ucc28\ub2e8 \ubaa8\uc790",
         "price":10800,
         "shopName":"LULULILAs",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8206021/82060219179.6.jpg",
         "uri":"https://smartstore.naver.com/dreamerskin/products/4515696035",
         "title":"\uc5ec\ub984 \ub18d\uc0ac \uc790\uc678\uc120 \ud587\ube5b \ucc28\ub2e8 \ubaa8\uc790 \ubc2d\uc77c \uc36c\ucea1 \uc36c\ubc14\uc774\uc800 \ubb3c\ub180\uc774 \uc77c \uc791\uc5c5 \ub18d\ubaa8 \ubaa8\uc790",
         "price":7900,
         "shopName":"\uafc8\uafb8\ub294\uc790",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8083331/80833318394.4.jpg",
         "uri":"https://smartstore.naver.com/uncleberryfarm/products/447808984",
         "title":"\ud587\ube5b\uac00\ub9ac\uac1c \uc5ec\ub984\ubaa8\uc790 \uc790\uc678\uc120 \ucc28\ub2e8 \ub18d\uc0ac \ubc2d\uc77c \uc791\uc5c5 \uc77c \ub18d\uc0ac\ubaa8\uc790",
         "price":11900,
         "shopName":"\uc5c9\ud074\ubca0\ub9ac\ud31c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8250650/82506506845.13.jpg",
         "uri":"https://smartstore.naver.com/mozzang/products/4961986543",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ub2e4\uac00\ub824 \uc791\uc5c5 \ub18d\uc0ac \ub18d\ubaa8 \ub18d\ubd80 \ubc2d\uc77c \ud587\ube5b\uac00\ub9ac\uac1c \uc131\uc778\ud50c\ub7a9\ucea1 \uc131\uc778\ubb3c\ub180\uc774 \ucc59 \ubaa8\uc790",
         "price":6500,
         "shopName":"\uc544\uc774\uc5e0\uc368\ub2c8",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8432899/84328994245.3.jpg",
         "uri":"https://smartstore.naver.com/cap5225/products/6784493923",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ubc2d\uc77c \ubaa8\uc790 \ub18d\uc0ac \uc6a9 \ub18d\ubd80 \uc77c \ubaa8\uc790 \uacfc\uc218\uc6d0 \ub18d\ucd0c \ud143\ubc2d \uc8fc\ub9d0\ub18d\uc7a5 \uc5ec\uc131 \uc36c\ucea1",
         "price":18100,
         "shopName":"\ucc3d\uc6d0\ubaa8\uc790",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8422837/84228370638.jpg",
         "uri":"https://smartstore.naver.com/j9star2/products/6683870316",
         "title":"\ub18d\uc0ac\uc6a9 \ub18d\uc0ac \ub18d\ubd80\ubaa8\uc790 \ucc3d\ub113\uc740\ubaa8\uc790 \ud587\ube5b\uac00\ub9ac\uac1c \uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790",
         "price":12000,
         "shopName":"\ud3c9\ubc94\uc0c1\ud68c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8558530/85585308397.1.jpg",
         "uri":"https://smartstore.naver.com/morumall/products/8040808074",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \uc5ec\ub984 \ub18d\uc0ac \ub3cc\ub3cc\uc774 \uc36c\ucea1 uva \ud587\ube5b \ubaa8\uc790",
         "price":11900,
         "shopName":"\ubaa8\ub8e8\uc7a1\ud654\uc810",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8319037/83190377267.jpg",
         "uri":"https://smartstore.naver.com/jj5621/products/5645880022",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8 \ubaa8\uc790 \uc5ec\ub984 UV \ud587\ube5b \ucc28\ub2e8 \uc36c\ucea1 \ubc2d\uc77c \ub18d\uc0ac \ub18d\ubaa8 \uadf8\ub298\ub9c9 \ubaa8\uc790",
         "price":8900,
         "shopName":"\uc81c\uc774\uc81c\uc774\ub9c8\ucf00\ud305",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8573961/85739619040.jpg",
         "uri":"https://smartstore.naver.com/safe99/products/8195118717",
         "title":"K2 \ucc28\uc591\ub9c9 \ubaa8\uc790 \uc5ec\ub984 \uc790\uc678\uc120\ucc28\ub2e8 \ub18d\uc0ac \uc791\uc5c5 \ub18d\ubd80 \ubc2d\uc77c \ucc3d \uc77c\ubaa8\uc790 \ud587\ubcd5 \ud587\ube5b\ucc28\ub2e8",
         "price":32900,
         "shopName":"\uad6c\uad6c\uc138\uc774\ud504",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8320004/83200046583.9.jpg",
         "uri":"https://smartstore.naver.com/seoyounshop/products/5655549277",
         "title":"\ucea0\ubaa8\uc544 \uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ud587\ube5b \uc5ec\ub984 \ub4f1\uc0b0 \ub09a\uc2dc \uc791\uc5c5 \ub18d\uc0ac \ubc2d\uc77c \ub18d\ubd80 \ub18d\ubaa8 \ud587\ube5b\uac00\ub9ac\uac1c \ubaa8\uc790",
         "price":6400,
         "shopName":"\uc11c\uc724\ud648\uc1fc\ud551",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8312087/83120873272.jpg",
         "uri":"https://smartstore.naver.com/tyrannoliving/products/5576377200",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ub0a8\uc790 \uc5ec\uc790 \uc131\uc778 \uc5ec\ub984 \ud587\ube5b \ucc28\ub2e8 \ub18d\uc0ac \ubc2d\uc77c \ubb3c\ub180\uc774 \uc77c \uc791\uc5c5 \ucc3d\ubaa8\uc790",
         "price":6000,
         "shopName":"\ud2f0\ub77c\ub178\ub9ac\ube59",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8083307/80833077070.2.jpg",
         "uri":"https://smartstore.naver.com/spozen/products/253560022",
         "title":"\uace0\uae09\uba74 \ub9ac\ubcf8 \ub048 \ub18d\ubaa8 \ub18d\uc0ac \uc791\uc5c5 \uc77c \ubaa8\uc790 \uaf43\ubb34\ub2ac \ubc2d\uc77c \ub18d\ubd80 \ud587\ube5b\ucc28\ub2e8",
         "price":5950,
         "shopName":"\ub9c8\uc774\uc2a4\ud3ec\uc98c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8305038/83050388101.6.jpg",
         "uri":"https://smartstore.naver.com/joybalac/products/5505892743",
         "title":"\uc790\uc678\uc120\ucc28\ub2e8\ubaa8\uc790 \ub18d\uc0ac \uc791\uc5c5 \ub2e4\uac00\ub824 \ubc2d\uc77c \ub18d\ubd80 \uc131\uc778\ud50c\ub7a9\ucea1 \uc131\uc778\ubb3c\ub180\uc774 \ubaa8\uc790",
         "price":6900,
         "shopName":"\uc870\uc774\ubc1c\ub77d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8447891/84478913915.jpg",
         "uri":"https://smartstore.naver.com/rabbit_horse/products/6934413593",
         "title":"\uadf8\ub298\ub9c9 \ub18d\uc0ac\ubaa8\uc790 \uc790\uc678\uc120\ucc28\ub2e8 \ub18d\ucd0c \uc77c \uc5ec\ub984 \uc791\uc5c5\ubaa8\uc790 \ub18d\uc0ac\uc6a9 \ub18d\ubd80 \ubc2d\uc77c\ubaa8\uc790",
         "price":5380,
         "shopName":"\ub798\ube57\ud640\uc2a4",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8318834/83188349757.1.jpg",
         "uri":"https://smartstore.naver.com/costmall-/products/5643852609",
         "title":"\uc5ec\uc131 \uc36c\ucea1 \uc5ec\ub984 \ub18d\uc0ac \uc791\uc5c5 \ud587\ube5b \uc790\uc678\uc120 uv \ucc28\ub2e8 \ubaa8\uc790 \ucc3d\ubaa8\uc790",
         "price":7800,
         "shopName":"COSTMALL",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8421995/84219950471.1.jpg",
         "uri":"https://smartstore.naver.com/costmall-/products/6675450149",
         "title":"\uc5ec\uc131 \ucc3d\ubaa8\uc790 \ub18d\uc0ac\uc6a9 \ub18d\uc0ac \uc791\uc5c5 UV\ucc28\ub2e8 \uce90\ub514 \uc77c \ubaa8\uc790",
         "price":14900,
         "shopName":"COSTMALL",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8328451/83284516410.jpg",
         "uri":"https://smartstore.naver.com/hasvik/products/5740017428",
         "title":"\uc131\uc778 \ud50c\ub7a9\ucea1 \ucea0\ud551 \ubaa8\uc790 \ubb3c\ub180\uc774 \uc5ec\uc131 \ub0a8\uc790 \uc36c\ucea1 \uc790\uc678\uc120\ucc28\ub2e8 \ud587\ube5b\ucc28\ub2e8 \ub18d\uc0ac \ubaa8\uc790",
         "price":10800,
         "shopName":"\ud558\uc2a4\ube44\ud06c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8323133/83231338379.1.jpg",
         "uri":"https://smartstore.naver.com/chansharp/products/5686840550",
         "title":"\ucc2c\uc2a4ChanS\ube0c\ub79c\ub4dc UV \ub18d\uc0ac\ubaa8\uc790 \ub18d\ubd80 \ud398\uc774\uc2a4 \ucee4\ubc84 \uc77c\ubaa8 \uc5ec\uc790 \ubaa8\uc790 CS-B5215",
         "price":13900,
         "shopName":"\ucc2c\uc2a4-ChanS",
         "platform":"naver"
      }
   ]
,
    "영양제": [
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_3978060/39780604141.jpg",
         "uri":"http://shop.interpark.com/gate/ippgw.jsp?goods_no=11436687621&biz_cd=P01397",
         "title":"\ud1f4\ube44\ud1b5 \uc720\uae30\ube44\ub8cc \uac70\ub984 \ub9cc\ub4e4\uae30 \uc6d0\uc608 \uc791\uc740 \ub18d\uc0ac \uc601\uc591\uc81c",
         "price":98390,
         "shopName":"\uc778\ud130\ud30c\ud06c\uc1fc\ud551",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8602890/86028900195.jpg",
         "uri":"https://smartstore.naver.com/todayberrys/products/8484399872",
         "title":"\ud1f4\ube44\ud1b5 \uc720\uae30\ube44\ub8cc \uac70\ub984 \ub9cc\ub4e4\uae30 \uc6d0\uc608 \uc791\uc740 \ub18d\uc0ac \uc601\uc591\uc81c",
         "price":110550,
         "shopName":"\uc624\ub298\ub538\uae30",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_9399674/9399674272.1.jpg",
         "uri":"http://shop.interpark.com/gate/ippgw.jsp?goods_no=3546596883&biz_cd=P01397",
         "title":"\uc300\uc9c0\ud0a4\ubbf8 \ubcbc\ub18d\uc0ac\uc601\uc591\uc81c \uaddc\uc0b0\uc9c8\ube44\ub8cc \uc561\uc0c1\ube44\ub8cc \uaddc\uc0b0",
         "price":12000,
         "shopName":"\uc778\ud130\ud30c\ud06c\uc1fc\ud551",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8316080/83160807618.jpg",
         "uri":"https://smartstore.naver.com/cheongnyeonmojong/products/5616311103",
         "title":"\uc6d0\uc608\uc77c\ud488 20kg \ubcf5\ud569\ube44\ub8cc \ud143\ubc2d \ud1f4\ube44 \uc6c3\uac70\ub984 \ubc11\uac70\ub984 \ub18d\uc0ac \uc601\uc591\uc81c",
         "price":20000,
         "shopName":"\uccad\ub144\ubaa8\uc885",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8358261/83582615132.3.jpg",
         "uri":"https://smartstore.naver.com/jihongye/products/6038115644",
         "title":"\uc6d4\ub3d9 \ubcd1\ucda9\ud574 \ubc29\uc81c \uc2dd\ubb3c \uc601\uc591\uc81c \ub18d\uc0ac\ub18d \uc11d\ud68c\uc720\ud669 \ud569\uc81c 3L",
         "price":18000,
         "shopName":"\ub18d\uc0ac\ub18d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_3967225/39672252618.jpg",
         "uri":"https://www.lotteon.com/p/product/LO2120204269?sitmNo=LO2120204269_2120204270&ch_no=100065&ch_dtl_no=1000030&entryPoint=pcs&dp_infw_cd=CHT",
         "title":"\uc2dd\ubb3c\ube44\ub8cc \uac70\ub984 \ud1f4\ube44 \uc720\uae30\uc9c8 \uc601\uc591\uc81c \ub18d\uc0ac \ubc2d \ubd84\uac08\uc774",
         "price":6680,
         "shopName":"\ub86f\ub370ON",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8601647/86016471395.jpg",
         "uri":"https://smartstore.naver.com/mzmangirl/products/8471971072",
         "title":"\uc2dd\ubb3c\ube44\ub8cc \uac70\ub984 \ud1f4\ube44 \uc720\uae30\uc9c8 \uc601\uc591\uc81c \ub18d\uc0ac \ubc2d \ubd84\uac08\uc774",
         "price":3000,
         "shopName":"\ub3c5\ub9bd\ub0a8\ub140\ubab0",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8478980/84789805268.jpg",
         "uri":"https://smartstore.naver.com/punggokfng/products/7245304946",
         "title":"\uc791\uc740\ub18d\uc7a5 \uace8\ub4dc 1kg \ubcf5\ud569\ube44\ub8cc \uc870\ube44 \ud143\ubc2d \uc6d0\uc608 \uc0b0\uc18c \uc794\ub514 \uac00\uc815\uc6d0\uc608 \ubc11\uac70\ub984 \ub18d\uc0ac \uc601\uc591\uc81c",
         "price":5000,
         "shopName":"\ud48d\uace1\uc601\ub18d\uc790\uc7ac",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_3918052/39180520224.jpg",
         "uri":"https://front.wemakeprice.com/affiliate/bridge?channelId=1000020&prodNo=2474316813&affiliateExtraNo=wmp_ep",
         "title":"\uc2dd\ubb3c \ube44\ub8cc \ud654\ubd84\uad00\ub9ac \uc601\uc591\uc81c \ub18d\uc0ac \ube44\ub8cc \ubbf8\ub7c9\uc694\uc18c \ud759 \uc2dd\ubb3c\ube44\ub8cc \uac70\ub984",
         "price":2240,
         "shopName":"\uc704\uba54\ud504",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8588169/85881690311.jpg",
         "uri":"https://smartstore.naver.com/smarthania/products/8337189988",
         "title":"\uc2dd\ubb3c \ube44\ub8cc \ud654\ubd84\uad00\ub9ac \uc601\uc591\uc81c \ub18d\uc0ac \ube44\ub8cc \ubbf8\ub7c9\uc694\uc18c \ud759 \uc2dd\ubb3c\ube44\ub8cc \uac70\ub984",
         "price":2150,
         "shopName":"\uc2a4\ub9c8\ud2b8\ud558\ub2c8A",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8350952/83509524390.1.jpg",
         "uri":"https://smartstore.naver.com/jihongye/products/5965024902",
         "title":"\ud143\ubc2d\ub18d\uc0ac \uc18c\ud615 \uc2dd\ubb3c \uc885\ud569 \uc601\uc591\uc81c \ub09c \ud654\ubd84\uc6a9 \ubbf8\ub178\ub9ac 20ml",
         "price":2600,
         "shopName":"\ub18d\uc0ac\ub18d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8397366/83973667456.jpg",
         "uri":"https://smartstore.naver.com/norazo/products/6429167123",
         "title":"\uc57c\ub77c\ub3c4\ud504\uc544\uadf8\ub85c \ud37c\ud2f0\ucf00\uc5b4311 1k \uc2dd\ubb3c\uc601\uc591\uc81c \ub18d\uc0ac\ud544\uc218\ud488 \ubc30\ucd94\ucd94\ube44",
         "price":15000,
         "shopName":"\uc2a4\ub178\uc6b0 \ud478\ub4dc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8358161/83581617280.5.jpg",
         "uri":"https://smartstore.naver.com/jihongye/products/6037117792",
         "title":"\ud37c\ud399\ud2b8\ud504\ub85c 100ml \ubfcc\ub9ac \ubc1c\uadfc\uc81c \uc0dd\uc7a5\ucd09\uc9c4 \uac1c\ud654 \ucd09\uc9c4 \uc870\uacbd\uc218 \ub09c \ud143\ubc2d \ub18d\uc0ac \uc2dd\ubb3c\uc601\uc591\uc81c",
         "price":20000,
         "shopName":"\ub18d\uc0ac\ub18d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8358238/83582387729.2.jpg",
         "uri":"https://smartstore.naver.com/jihongye/products/6037888241",
         "title":"\uc288\ud37c\uae08\uc790\ud0d1 100ml \ub2e4\uc721\uc774 \uace0\ucd94 \ubc30\ucd94 \ud143\ubc2d \ub18d\uc0ac \ubca0\ub780\ub2e4 \ud654\ubd84 \uc601\uc591\uc81c",
         "price":4000,
         "shopName":"\ub18d\uc0ac\ub18d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_3970322/39703223496.jpg",
         "uri":"http://shop.interpark.com/gate/ippgw.jsp?goods_no=11418255533&biz_cd=P01397",
         "title":"\ub300\uc6a9\ub7c9 \ud1f4\ube44\ud1b5 \uc720\uae30\uc9c8 \ube44\ub8cc \ud654\ucd08 \uc601\uc591\uc81c \uac00\ub4dc\ub2dd \ub18d\uc0ac",
         "price":79150,
         "shopName":"\uc778\ud130\ud30c\ud06c\uc1fc\ud551",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8602155/86021554110.jpg",
         "uri":"https://smartstore.naver.com/sambo772/products/8477053787",
         "title":"\ub300\uc6a9\ub7c9 \ud1f4\ube44\ud1b5 \uc720\uae30\uc9c8 \ube44\ub8cc \ud654\ucd08 \uc601\uc591\uc81c \uac00\ub4dc\ub2dd \ub18d\uc0ac",
         "price":88930,
         "shopName":"\uc0bc\ubcf4\uc0c1\uc0acSB",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8306989/83069891191.2.jpg",
         "uri":"https://smartstore.naver.com/seed1558/products/5525395704",
         "title":"\ubd88\uac00\uc0ac\ub9ac 500cc / fm\uc560\uadf8\ud14d \uce5c\ud658\uacbd\ube44\ub8cc \uce7c\uc298\uc81c \uc2dd\ubb3c\uc601\uc591\uc81c \ud143\ubc2d\ub18d\uc0ac \uace0\ucd94\uc601\uc591\uc81c",
         "price":9500,
         "shopName":"\uc528\uc557\uacfc\ubb18\ubaa9",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8603444/86034444864.jpg",
         "uri":"https://smartstore.naver.com/heartfree/products/8489944541",
         "title":"\uc778\uccb4 \ubb34\ud574\ud55c \ucc9c\uc5f0\uc131\ubd84 \uc0ac\uc6a9 \uc2a4\ud504\ub808\uc774\ud615 \ubc85\uc2a4\ud0ac 500ml \uc2dd\ubb3c\uc601\uc591\uc81c \ub18d\uc0ac",
         "price":8070,
         "shopName":"\uc2dc\uadf8\ub110\ud558\ud2b8",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8610158/86101583703.jpg",
         "uri":"https://smartstore.naver.com/ssowant/products/8557083380",
         "title":"\ub300\uc6a9\ub7c9 \ubfcc\ub9ac \ubc1c\uadfc \uac15\ud654\uc81c 4L \uc2dd\ubb3c\uc601\uc591\uc81c \ub18d\uc0ac \uc8fc\ub9d0\ub18d\uc7a5 \ud1a0\uc591 \ube44\ub8cc \uad6d\ub0b4\uc0b0",
         "price":95200,
         "shopName":"\uc3d8\uc6d0\uc2a4\ud1a0\uc5b4",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8609936/86099363680.jpg",
         "uri":"https://smartstore.naver.com/hwanivini/products/8554863357",
         "title":"\ubc2d \ub18d\uc0ac \uc2dd\ubb3c\uc601\uc591\uc81c \ud143\ubc2d \ube44\ub8cc \uba40\ud2f0 \uc544\uc774\uc5b8\ub77c\uc774\ud2b8 \uc8fc\ub9d0\ub18d\uc7a5 \ud654\ub2e8 \uc815\uc6d0",
         "price":2000,
         "shopName":"\ud654\ub2c8\ube44\ub2c8\ubab0",
         "platform":"naver"
      }
   ]
    ,
    "농수산물": [
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8326458/83264581531.2.jpg",
         "uri":"https://adcr.naver.com/adcr?x=7idYjjIzI9wTNWV18e4DS////w==kMMNZ+WmOFmxJVGtASJJZS/3LMKw98/G7PcP2u9bdDBaouW4pHjyJCQLATHhc8tPVBA+ORDGuY29aNsrfkQ8bsQtvg7nxonRomEfBISamSwNbrRdzigH0FtQFlpk7o+DxViomsC+xObbhui8Nu3BpYq4eY1n6ebFJlIZ+3Q981zxOkhZRqVDhdQoRlgagSsghwT2+0gi0zePLUgBUVb/sMcTsYMsBfRHi//KXxcZ73J2QqGRplnEAoOeM1kYJRvph6Fk39crG14+baBjgwIiGrwFdTlD0JK7SRD9OT/kItHZfF0/6YS93m1DuXzRGuuRGbPzg+EoVNReyTj4d5r0tWkOuvWrM+tVaDqwOfrZ8RlbnYutMOv3rU2tpmDlE3Md3F5SFoF/Xs+JzdpDoDnmGFCbwTfnETMr8MuZP0GPzhvArQekEGPflSQ/KNhqtJFPhI3IktZ+4ttyatcVKksh0IYOzuGAU+q4PJTA37HY8O35S09kp43KJcGK3Bzqm93Hen9lxbWQ24Tuh1nZKoJV7OvLf7KwIBoH1td9SnEgAEZHllQwxjmVrZBzs/lBPETcmIAc+wBOssN1MqXwnZhUhh+8axailaoear/If2eovIC+8EV5nhLhXqRegMMMM0ntmpfyG74Ql95N+IOY4FR/LLHL6s6/YvEm3u0kl72B9KbR6/u9/UVuvYX3Ope4B8LkgHYonUd3Clo2LzArKM5FzxzQhFWSCKBjzuz+ZEGMCBx1hRp7Xd3eC8tMJ+ezTiyK+DBmdyIoSUTb1DsnS6eDC7g01RKZo9o2kTQpBx7kPUi87GggeRv3MbQUtEwdtxqv5lvDG2DQlmwoRCZEwOdLwWvlJOaaP9faHCaDg7kdCuImQmIm4k5gb4Q7yKbU8pMJUNzuRpRdtQc2JoYuPonllUCSWpKZxpthz710qB3ABSJLOIQm0wO/SB4a5mRo6eaxokTAHh7587ZGJm4InWlwkLwWhs+H9eYjvnkPfD/JMfyOPEkxXCKzR+ATXBLcyOZ63",
         "title":"\ud587 \ucd08\ub2f9\uc625\uc218\uc218 10\uac1c\uc785 \ub178\ub791\uc625\uc218\uc218 \uc625\uc218\uc218",
         "price":14900,
         "shopName":"\uc774\uc7a5\uba70\ub290\ub9ac",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8611755/86117558384.jpg",
         "uri":"https://adcr.naver.com/adcr?x=K8zmRnF6/cjGqcoL30yI3f///w==kpqGi9XqX82U/z6hLoGDvfAOpjIMR0bj+ypkJDaiGoJj7pCI42mOKiH+lEEwS7Gs9H7V8Yj7vLxMH6Gx4fgV7w1sMRkH7DqeB9dloI0QNml3QtY78gE9njWKkSt/DVdN8ZeseHRr27nRBBjDV0jVse9kaYV6UwXUdY3pMrwHpzz/s1cjFJRH086Z8Ype9k6psezAO0zjOccdC9p/1nwQOtw22eLpsTN4pTBi0D+nUUxGV2/y+MyV2l99z9enYwHMU0qp16fBJqkCPG1PPisPVrJLwq5r1tslJTr3JMjYxzpWqGujtfa+xAhpKTD5QoODpSoiEEyqK06fvMpxFdK7c4zScGEXXVIkaff2x/wsd53/Aryp8kwSHUMKN349d+c7SrG7SvNvP5XKof0PQ7hPIeV0sEUyqZJo7fAgtQPV41r0+beD9zr02MUQLpNmLWjffAufxbMslWpJd4UOwYM42fpb3DVhriJsqsvAadSOVQbG/01XsJdAHuxRWh1d1+oDHcFkKyN5jCGWe/DVESBV6Pb78cy9Pu8Xl/nBv0QDjf1sYfZ2/ofkBVyKP9U6IFKB1ZPUeKWVY0fbEgDAv21kyR2hL2FDvkwelPekyXn183gelo17WaZhPngUsni55zER/SY4nAM52FDdNrLGxlIBf83bPjhtJ4Wm+d6LvoFqLVX5y88sJyoZAncWd5d0PU9UqgrAz2p16kDywPHLxmIntUP7zdrAJgcWkRwOAD2zSoJflWjJtOCun1fd7qgJcT9h05zyDgNKHVU2ocsvQ0WR1zZahXKlemyUwlEGWzH6M61b5Y5G/2y0JBOXE0+2KN2xa6Q4/QmVfvz0gx70/keh4mBNGIX90AAXM/v48a/Mfthf/yZjff/MWu6jHrODpYJY3",
         "title":"\ub2f9\uc77c\uc218\ud655 \ud587 \ud638\ubc15\uc78e 500g \uad6d\ub0b4\uc0b0",
         "price":7900,
         "shopName":"\uc544\uc774\uc564\ud2f0",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1179470/11794705540.1.jpg",
         "uri":"https://adcr.naver.com/adcr?x=wIuhsiW4fpTJP9h6T445nP///w==kVuFoQowpUnf1+MHvDwafWXWZLlPcLwexeozg7wPo7DLM5MQow0qefOyZiahfX5kL78HWhVEJoQITtJfKSU1eMRRKoYZZmyexV7emlVCpKlbiYpIY/JNqL7ShNHL76tm7sDjWRnv0EkxeZkdvnnr41NSGrNJkNb68PZ0vPbpE6elbmdAHaCeVdmSs50StGeNQTV79xPYaH2lguIoIiFc8ileV9E2YqAkZYmteN8nDlVmReQaywgYCDjVVJvVYOhpjPTmigWQM47zxGdwT7q2XhBolNtpZOX08hGX73B7zUDutC5TEpCKHPaPamzmMqng8Mn5P/RrX6evB9TBHWCdoMDGvvwTT+RJaYwulTLbanl689+icj4pI81WE62GlMoq2On46yL5Ng2zYmxZclXxiQdhVyKssjBwevK0QihrK/lvogBuy4eXUbfxFdJbLI+fmqmaUdplftxn2btwYZubY4eVJDd9WMnJenXxgF78qMrzEQbB7Mg0Qw1Be8pggObFhPVVH5GJJmyhwr8o8GPVTXT4mI999dxreMURDef9LdRFoYxKtRVkPeKmVVaQWkM9so8W9dXovkY8oPjRncxlkBwIeRKdqEuSxGHB3wDOG7L02wMGG6Cll8j+1Eldyo4aCNVHoavUraaxaiuhLgZEi4Mt6d5RGkP1keF3tGarncU9bLZnbqowxaH9S9qed+0mA0DkaTd4r9tH1Rrm4a89WnKVkJUoA/hx06EqqVe2gG/9dj1n24Oifvfg58g2jzJfyJTdpZ2TZAMfJqYEAJP9oMQat+5xrqAi6J8Q0fxyED/yOzzYumJ4ergdhKlvytCnyCSDMO7zxLUVKMIB6ztqfCm8TVCWQ5BkxLUOnb80h+lk=",
         "title":"\uc21c\ud48d \uc784\uc0b0\ubd80 \uac74\uc870\ud638\ubc15\uc190 \ucc28100g+\ub9db\ubcf4\uae30\uc9992\ud3ec",
         "price":30000,
         "shopName":"\uc6b0\ub9ac\ubaa8\ub450\uc21c\ud48d",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8280139/82801390529.1.jpg",
         "uri":"https://smartstore.naver.com/mezongde/products/5256868036",
         "title":"\ud574\ub0a8 \uc138\ucc99 \uafc0 \uace0\uad6c\ub9c8 \ubca0\ub2c8\ud558\ub8e8\uce74 3kg 5kg 10kg",
         "price":7900,
         "shopName":"\ub355\uad6c\ub124\ub18d\uc0b0\ubb3c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8252718/82527183386.3.jpg",
         "uri":"https://smartstore.naver.com/fruitggun/products/4982662920",
         "title":"\ubcf5\uc22d\uc544 \uc2e0\ube44\ubcf5\uc22d\uc544 \ub0a9\uc791\ubcf5\uc22d\uc544 \ub531\ub531\uc774 \ub9d0\ub791\uc774 \uac70\ubc18\ub3c4 \ub300\uadf9\ucc9c \ucc9c\ub3c4 \ubc31\ub3c4 \ud669\ub3c4 \ud558\uc6b0\uc2a4",
         "price":9900,
         "shopName":"\uacfc\uc77c\uafbc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8335589/83355896133.9.jpg",
         "uri":"https://smartstore.naver.com/homgol/products/5811396719",
         "title":"\uc0ac\uacfc \uacbd\ubd81 \ubd80\uc0ac \ubabb\ub09c\uc774 \uafc0\uc0ac\uacfc 5kg 10kg",
         "price":24900,
         "shopName":"\uccad\uc1a1\ud648\uace8\ub18d\uc6d0",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_1425493/14254934755.jpg",
         "uri":"https://smartstore.naver.com/natureproduce/products/2006004385",
         "title":"\uad11\uc591\ub2e4\uc555 GAP\uc778\uc99d \ucabc\uac20\ub9e4\uc2e4 \ud669\ub9e4\uc2e4 \uccad\ub9e4\uc2e4",
         "price":18900,
         "shopName":"\uc790\uc5f0\uc758\ub18d\ubd80",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8370002/83700029746.1.jpg",
         "uri":"https://smartstore.naver.com/redfruits/products/6155530258",
         "title":"\uc0ac\uacfc \uccad\uc1a1 \ubb38\uacbd \uaecd\uc9c8\uc9f8\uba39\ub294 \uc138\ucc99 10kg 5kg",
         "price":35800,
         "shopName":"\ube68\uac04\uacfc\uc77c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8065439/80654399757.jpg",
         "uri":"https://smartstore.naver.com/inhane/products/3156655428",
         "title":"\uc778\ud558\ub124 \ud504\ub9ac\ubbf8\uc5c4 \ucd08\ub2f9\uc625\uc218\uc218 \ud2b9\ud488 \ubbf8\ub2c8 \uad6d\uc0b0 \uc81c\uc8fc \ud574\ub0a8 \uc625\uc218\uc218",
         "price":15900,
         "shopName":"\uc778\ud558\ub124",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8242421/82424214464.2.jpg",
         "uri":"https://smartstore.naver.com/fruitggun/products/4879690993",
         "title":"\uc131\uc8fc \uafc0 \ucc38\uc678 \uc120\ubb3c\uc6a9 \ubabb\ub09c\uc774",
         "price":9900,
         "shopName":"\uacfc\uc77c\uafbc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8265482/82654826970.8.jpg",
         "uri":"https://smartstore.naver.com/mezongde/products/5110304924",
         "title":"2023 \ud587 \uc218\ubbf8\uac10\uc790 \uce74\uc2a4\ud14c\ub77c \ud64d\uac10\uc790 \uad6d\ub0b4\uc0b0 3kg 5kg 10kg",
         "price":5900,
         "shopName":"\ub355\uad6c\ub124\ub18d\uc0b0\ubb3c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8429746/84297465705.1.jpg",
         "uri":"https://smartstore.naver.com/daldaguni/products/6752965383",
         "title":"\ub2ec\ub2e4\uad6c\ub2c8 \uc81c\ucca0 \uace0\ub2f9\ub3c4 \ucd08\ub2f9\uc625\uc218\uc218 \uadf8\ub0e5\uba39\ub294 \uc0dd\uc625\uc218\uc218 \ud504\ub9ac\ubbf8\uc5c4 \uc625\uc218\uc218",
         "price":13900,
         "shopName":"\ub2ec\ub2e4\uad6c\ub2c8",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8085882/80858823141.1.jpg",
         "uri":"https://smartstore.naver.com/nsm33313140/products/3333012376",
         "title":"\ubcf5\uc22d\uc544 \ub0a9\uc791\ubcf5\uc22d\uc544 \uc2e0\ube44\ubcf5\uc22d\uc544 \ub531\ub531\uc774 \ucc9c\ub3c4 \ub9d0\ub791\uc774 \ub300\uadf9\ucc9c \ubc31\ub3c4 \ud669\ub3c4 \uc2e0\uc120",
         "price":9900,
         "shopName":"\uae08\uba54\ub2ec\ub18d\uc0b0\ubb3c",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8400273/84002732489.jpg",
         "uri":"https://smartstore.naver.com/fruitggun/products/6458232156",
         "title":"\ud504\ub9ac\ubbf8\uc5c4 \uace0\ub2f9\ub3c4 \uafc0 \uc218\ubc15 \uc560\ud50c\uc218\ubc15 \uc528\uc5c6\ub294 \uc218\ubc15 \ud751\uc218\ubc15",
         "price":15900,
         "shopName":"\uacfc\uc77c\uafbc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8302698/83026987391.jpg",
         "uri":"https://smartstore.naver.com/gksmf0227/products/5482492529",
         "title":"\uc0b0\uc9c0\uc9c1\uc1a1 \uc11d\uad70\ucc38\uc678 \ub2f9\ub3c4\uc120\ubcc4 \uac00\uc815\uc6a9 \uc120\ubb3c\uc6a9 \uc131\uc8fc\ucc38\uc678 \uc2e4\uc911\ub7c9",
         "price":8900,
         "shopName":"\uc11d\uad70\ucc38\uc678\ub18d\uc7a5",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8353037/83530377125.3.jpg",
         "uri":"https://smartstore.naver.com/daldaguni/products/5985877637",
         "title":"\uc2a4\ud14c\ube44\uc544 \ud1a0\ub9c8\ud1a0 \ud1a0\ub9dd\uace0 \uc2a4\ud14c\ube44\uc544 \ubc29\uc6b8\ud1a0\ub9c8\ud1a0 \uc0e4\uc778\ub9c8\ud1a0 \uc560\ud50c \uc644\uc219 \uc124\ud0d5 \ub300\ucd94 \uc120\ubb3c\uc138\ud2b8",
         "price":3700,
         "shopName":"\ub2ec\ub2e4\uad6c\ub2c8",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8353316/83533163754.jpg",
         "uri":"https://smartstore.naver.com/inuk/products/5988664266",
         "title":"\ud574\ub0a8 \ud587 \uafc0 \uace0\uad6c\ub9c8 \ud55c\uc785 \uc138\ucc99 \ubca0\ub2c8\ud558\ub8e8\uce74 3kg 5kg 10kg",
         "price":6900,
         "shopName":"\ub7ed\ud0a4 \ud478\ub4dc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8048174/80481744849.jpg",
         "uri":"https://smartstore.naver.com/woori7246/products/2984000871",
         "title":"\uad11\uc591 \ud64d\ub9e4\uc2e4 \ud669\ub9e4\uc2e4 \ucabc\uac20 \ub9e4\uc2e4 \uccad\ub9e4\uc2e4 5kg 10kg",
         "price":15800,
         "shopName":"\uc11c\uae30\ub124\ub18d\uc7a5",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8239764/82397644693.jpg",
         "uri":"https://smartstore.naver.com/fruitggun/products/4853121394",
         "title":"\uace0\ub2f9\ub3c4 \ud504\ub9ac\ubbf8\uc5c4 \ube14\ub799\ub77c\ubca8 \uc624\ub80c\uc9c0",
         "price":11900,
         "shopName":"\uacfc\uc77c\uafbc",
         "platform":"naver"
      },
      {
         "thumbnailUri":"https://shopping-phinf.pstatic.net/main_8315272/83152729404.1.jpg",
         "uri":"https://smartstore.naver.com/sum_0512/products/5608232903",
         "title":"\ud558\uc6b0\uc2a4 \ubcf5\uc22d\uc544 \ub3c4\ub11b \ub0a9\uc791\ubcf5\uc22d\uc544 \ub300\uadf9\ucc9c \uc2e0\ube44\ubcf5\uc22d\uc544 \ub531\ub531\uc774 \ub9d0\ub791\uc774 \ucc9c\ub3c4 \ubc31\ub3c4 \ub9dd\uace0\ub9db \ud669\ub3c4 \ud5c8\ub2c8\ucac0\ubcf5\uc774 \uac70\ubc18\ub3c4 \uc81c\ucca0\uacfc\uc77c",
         "price":10800,
         "shopName":"\ub9d1\uc740 \uc228",
         "platform":"naver"
      }
   ]
}


// Object.values(topCategories).some((category,categoryIndex) => {
//     for(let i = 0;i<10;i++){
//         let curTitle = Object.keys(topCategories)[categoryIndex];
//         category.push({
//             thumbnailUri: "https://shop-phinf.pstatic.net/20210810_178/1628594114765KrsJ7_JPEG/36058746882234432_1876292896.jpg?type=m510",
//             uri: "https://smartstore.naver.com/joytools/products/7712970424?NaPm=ct%3Dli6260js%7Cci%3De71235e8d0b531024ce61e44b9f9a3e2a95b9e36%7Ctr%3Dslct%7Csn%3D317113%7Chk%3D4657cceeb95b410d67c0d4443fa3f8d42707bc74",
//             title: curTitle+i,
//             price: 10000,
//             shopName: "양봉샵",
//             platform: "sixshop"
//         })
//     }
// });

DummyItems

const Market = () => {
    const [selectedKey,setSelectedKey] = useState(Object.keys(topCategories)[0]);
    const [wholeItems,setWholeItems] = useState([]);
    const [items,setItems] = useState([]);
    const [favoriteItems,setFavoriteItems] = useState([]);
    const [opennedItemIndex,setOpennedItemIndex] = useState(-1);
    const [favoriteOpennedItemIndex,setFavoriteOpennedItemIndex] = useState(-1);
    const [searchText,setSearchText] = useState("");

    useEffect(()=>{
        setFavoriteOpennedItemIndex(-1);
    },[opennedItemIndex]);

    useEffect(()=>{
        setOpennedItemIndex(-1);
    },[favoriteOpennedItemIndex]);
    

    useEffect(()=>{
        setFavoriteItems(topCategories[selectedKey]);
        setWholeItems(topCategories[selectedKey]);
        // setItems(topCategories[selectedKey]);
    },[selectedKey]);

    useEffect(()=>{
        setItems(wholeItems.filter(item => item.title.indexOf(searchText)!==-1));
    },[wholeItems,searchText])

    const handleInputFocus = () => {
        document.querySelector("#inputSearch").focus();
    };

    const handleSearch = () => {

    }


    return <div>
        <div className="TopStickyBox">
            <Header title="팜 스토어" />




            <div
                className={"flexRow wfull relative"}
                style={{ justifyContent: "center" }}
            >
                <div className={"designText7"} style={{ marginBottom: "20px", marginTop:"32px" }}>
                    팜 스토어
                </div>
            </div>
            <div style={{padding: "0px 20px",marginBottom: 20}} >
                <div
                    onClick={()=>{
                        handleInputFocus()
                    }} 
                    style={{border: "1px solid #F9F9F9", borderRadius: 12,height: 48,padding: "0px 14px", width: "100%",display: "flex", justifyContent: "center", alignItems: "center"}} 
                >
                    <input 
                        id="inputSearch"
                        type="text" 
                        style={{width: "100%",height: 22,fontSize: 14, fontWeight: 600,marginRight: 6}} placeholder="Placeholder." 
                        onChange={(e)=>{setSearchText(e.target.value)}}
                    />
                    <img src="/images/search.png" />
                </div>
            </div>
            <SelectSlider keys={Object.keys(topCategories)} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
        </div>

        <div style={{width: "100%",fontWeight: 600, fontSize: 18,textAlign: "left",paddingLeft: 20,marginTop: 16, marginBottom: 20}} >추천 상품</div>
        <div style={{minWidth: "100%",width: "100%", marginTop: 16, marginBottom: 70 ,overflowX: "scroll",display: "flex",flexWrap: "nowrap",padding: "0px 20px",gap: 10}} >
            <DummyItems />
            {/* {
                favoriteItems.map((item,itemIndex) => (
                    <Fragment>
                        <ProductCardSmall
                            opennedItemIndex={opennedItemIndex}
                            setOpennedItemIndex={setOpennedItemIndex}
                            width={160} 
                            price={item.price}
                            title={item.title}
                            thumbnailUri={item.thumbnailUri}
                            index={itemIndex}
                            shopName={item.shopName}
                            platform={item.platform}
                            uri={item.uri}
                        />
                        <ProductModal
                            opennedItemIndex={opennedItemIndex}
                            setOpennedItemIndex={setOpennedItemIndex}
                            item={item}
                            itemIndex={itemIndex}
                        />
                    </Fragment>
                ))
            } */}
        </div>
        
        <div style={{width: "100%",fontWeight: 600, fontSize: 18,textAlign: "left",paddingLeft: 20, marginBottom: 16}} >전체 상품({items.length}개)</div>
        <div className="MarketItemWrapper" >
            {
                items.map((item,itemIndex) => 
                    <Fragment>
                        <ProductCardSmall
                            opennedItemIndex={opennedItemIndex}
                            setOpennedItemIndex={setOpennedItemIndex}
                            width={"calc(50% - 10px)"} 
                            price={item.price}
                            title={item.title}
                            thumbnailUri={item.thumbnailUri}
                            index={itemIndex}
                            shopName={item.shopName}
                            platform={item.platform}
                            uri={item.uri}
                        />
                        <ProductModal
                            opennedItemIndex={opennedItemIndex}
                            setOpennedItemIndex={setOpennedItemIndex}
                            item={item}
                            itemIndex={itemIndex}
                        />
                    </Fragment>
                )
            }
        </div>
    </div>
}
export default Market;