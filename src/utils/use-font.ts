import { useState, useEffect } from "react";
import { useRouter } from "next/router";


// "font-cairoRegular": (variant === "body" || variant === "subHeading" || variant==="label") && direction=="rtl",
// "font-cairoBoldAr": (variant === "mediumHeading" || variant=="pageHeading" ) && direction=="rtl",
// "font-cairoSemiBoldAr": (variant === "mediumHeading" || variant=="pageHeading" ||  variant === "itemListing" ) && direction=="rtl",
// "font-montserratSemiBold": (variant === "itemListing") && direction=="ltr",
// "font-montserratRegular": (variant === "body" || variant === "subHeading" || variant==="label") && direction=="ltr",
// "font-montserratBold": (variant === "mediumHeading" || variant=="pageHeading" ) && direction=="ltr",

const fontsList:any = {
	"en":{
		 "regular":"font-montserratRegular",
		 "semibold":"font-montserratSemiBold",
		 "bold":"font-montserratBold",
		  
	},
	"ar":{
		"regular":"font-cairoRegular",
		"semibold":"font-cairoSemiBoldAr",
		"bold":"font-cairoBoldAr",
	}
};


export default function useFont() {
	const router = useRouter();

	const [fontName,setFontName] = useState<any>(fontsList["ar"]);

	useEffect(() => {
	
		 try {

		 let langCode = router.locale ?router.locale:""; 
			
		 let result = fontsList[langCode]

		  setFontName(result)

		 } catch (error) {
			 
		 }


	}, [router.locale]);

	return fontName;
}
