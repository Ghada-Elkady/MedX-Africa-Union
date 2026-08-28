import DermatologyImg from "../../assets/Filter/Specialties/Dermatology.png";
import DentistryImg from "../../assets/Filter/Specialties/Dentistry.png";
import PsychiatryImg from "../../assets/Filter/Specialties/Psychiatry.png";
import PediatricsNewBornImg from "../../assets/Filter/Specialties/Pediatrics and New Born.png";
import NeurologyImg from "../../assets/Filter/Specialties/Neurology.png";
import OrthopedicsImg from "../../assets/Filter/Specialties/Orthopedics.png";
import GynaecologyInfertilityImg from "../../assets/Filter/Specialties/Gynaecology and Infertility.png";
import EarNoseThroatImg from "../../assets/Filter/Specialties/Ear, Nose and Throat.png";
import CardiologyVascularImg from "../../assets/Filter/Specialties/Cardiology and Vascular Disease.png";
import InterventionalRadiologyImg from "../../assets/Filter/Specialties/Interventional Radiology.png";
import HematologyImg from "../../assets/Filter/Specialties/Hematology.png";
import OncologyImg from "../../assets/Filter/Specialties/Oncology.png";
import InternalMedicineImg from "../../assets/Filter/Specialties/Internal Medicine.png";
import DietitianNutritionImg from "../../assets/Filter/Specialties/Dietitian and Nutrition.png";
import PediatricSurgeryImg from "../../assets/Filter/Specialties/Pediatric Surgery.png";
import OncologySurgeryImg from "../../assets/Filter/Specialties/Oncology Surgery.png";
import VascularSurgeryImg from "../../assets/Filter/Specialties/Vascular Surgery.png";
import PlasticSurgeryImg from "../../assets/Filter/Specialties/Plastic Surgery.png";
import ObesityLaparoscopicImg from "../../assets/Filter/Specialties/Obesity and Laparoscopic Surgery.png";
import GeneralSurgeryImg from "../../assets/Filter/Specialties/General Surgery.png";
import SpinalSurgeryImg from "../../assets/Filter/Specialties/Spinal Surgery.png";
import CardiologyThoracicImg from "../../assets/Filter/Specialties/Cardiology and Thoracic Surgery.png";
import NeurosurgeryImg from "../../assets/Filter/Specialties/Neurosurgery.png";
import GastroenterologyEndoscopyImg from "../../assets/Filter/Specialties/Gastroenterology and Endoscopy.png";
import AllergyImmunologyImg from "../../assets/Filter/Specialties/Allergy and Immunology.png";
import IVFInfertilityImg from "../../assets/Filter/Specialties/IVF and Infertility.png";
import AndrologyInfertilityImg from "../../assets/Filter/Specialties/Andrology and Male Infertility.png";
import RheumatologyImg from "../../assets/Filter/Specialties/Rheumatology.png";
import DiabetesEndocrinologyImg from "../../assets/Filter/Specialties/Diabetes and Endocrinology.png";
import AudiologyImg from "../../assets/Filter/Specialties/Audiology.png";
import ChestRespiratoryImg from "../../assets/Filter/Specialties/Chest and Respiratory.png";
import FamilyMedicineImg from "../../assets/Filter/Specialties/Family Medicine.png";
import EldersImg from "../../assets/Filter/Specialties/Elders.png";
import VeterinaryImg from "../../assets/Filter/Specialties/veterinary.png";
import OsteopathyImg from "../../assets/Filter/Specialties/Osteopathy.png";
import PainManagementImg from "../../assets/Filter/Specialties/Pain Management.png";
import PhysiotherapySportImg from "../../assets/Filter/Specialties/Physiotherapy and Sport Injuries.png";
import OphthalmologyImg from "../../assets/Filter/Specialties/Ophthalmology.png";
import HepatologyImg from "../../assets/Filter/Specialties/Hepatology.png";
import NephrologyImg from "../../assets/Filter/Specialties/Nephrology.png";
import DiagnosticRadiologyImg from "../../assets/Filter/Specialties/Diagnostic Radiology.png";
import UrologyImg from "../../assets/Filter/Specialties/Urology.png";
import LaboratoriesImg from "../../assets/Filter/Specialties/Laboratories.png";
import GeneralPracticeImg from "../../assets/Filter/Specialties/General Practice.png";
import PhoniatricsImg from "../../assets/Filter/Specialties/Phoniatrics.png";



const filtersOptions = {
    specialties: [
        { value: "جلدية", en: "Dermatology Physician", img: DermatologyImg },
        { value: "اسنان", en: "Dentistry Physician", img: DentistryImg },
        { value: "نفسي", en: "Psychiatry Physician", img: PsychiatryImg },
        { value: "باطنة", en: "Internal Medicine Physician", img: InternalMedicineImg },
        { value: "اطفال وحديثي الولادة", en: "Pediatrics & Neonatology Physician", img: PediatricsNewBornImg },
        { value: "مخ واعصاب", en: "Neurology Physician", img: NeurologyImg },
        { value: "جراحة مخ واعصاب", en: "Neurosurgery Physician", img: NeurosurgeryImg },
        { value: "عظام", en: "Orthopedics Physician", img: OrthopedicsImg },
        { value: "قلب واوعية دموية", en: "Cardiology & Vascular Physician", img: CardiologyVascularImg },
        { value: "صدر وجهاز تنفسي", en: "Pulmonology Physician", img: ChestRespiratoryImg },
        { value: "جهاز هضمي ومناظير", en: "Gastroenterology Physician", img: GastroenterologyEndoscopyImg },
        { value: "كبد", en: "Hepatology Physician", img: HepatologyImg },
        { value: "كلى", en: "Nephrology Physician", img: NephrologyImg },
        { value: "سكر وغدد صماء", en: "Endocrinology Physician", img: DiabetesEndocrinologyImg },
        { value: "روماتيزم", en: "Rheumatology Physician", img: RheumatologyImg },
        { value: "حساسية ومناعة", en: "Allergy & Immunology Physician", img: AllergyImmunologyImg },
        { value: "نساء وتوليد", en: "Gynecology & Obstetrics Physician", img: GynaecologyInfertilityImg },
        { value: "ذكورة وعقم", en: "Andrology & Infertility Physician", img: AndrologyInfertilityImg },
        { value: "انف واذن وحنجرة", en: "ENT Physician", img: EarNoseThroatImg },
        { value: "عيون", en: "Ophthalmology Physician", img: OphthalmologyImg },
        { value: "جراحة اطفال", en: "Pediatric Surgery Physician", img: PediatricsNewBornImg },
        { value: "جراحة عامة", en: "General Surgery Physician", img: GeneralSurgeryImg },
        { value: "جراحة اوعية دموية", en: "Vascular Surgery Physician", img: VascularSurgeryImg },
        { value: "جراحة قلب وصدر", en: "Cardiothoracic Surgery Physician", img: CardiologyThoracicImg },
        { value: "جراحة تجميل", en: "Plastic Surgery Physician", img: PlasticSurgeryImg },
        { value: "جراحة أورام", en: "Oncologic Surgery Physician", img: OncologySurgeryImg },
        { value: "جراحة سمنة ومناظير", en: "Bariatric & Laparoscopic Surgery Physician", img: ObesityLaparoscopicImg },
        { value: "جراحة عمود فقري", en: "Spine Surgery Physician", img: SpinalSurgeryImg },
        { value: "اورام", en: "Oncology Physician", img: OncologyImg },
        { value: "امراض دم", en: "Hematology Physician", img: HematologyImg },
        { value: "تخسيس وتغذية", en: "Nutrition Physician", img: DietitianNutritionImg },
        { value: "طب الأسرة", en: "Family Medicine Physician", img: FamilyMedicineImg },
        { value: "طب المسنين", en: "Geriatrics Physician", img: EldersImg },
        { value: "طب بيطري", en: "Veterinary Medicine Physician", img: VeterinaryImg },
        { value: "طب تقويمي", en: "Osteopathic Medicine Physician", img: OsteopathyImg },
        { value: "علاج الآلام", en: "Pain Management Physician", img: PainManagementImg },
        { value: "علاج طبيعي واصابات ملاعب", en: "Physiotherapy & Sports Injuries Physician", img: PhysiotherapySportImg },
        { value: "سمعيات", en: "Audiology Physician", img: AudiologyImg },
        { value: "نطق وتخاطب", en: "Speech & Language Therapy Physician", img: PhoniatricsImg },
        { value: "مراكز أشعة", en: "Radiology Physician", img: DiagnosticRadiologyImg },
        { value: "الآشعة التداخلية", en: "Interventional Radiology Physician", img: InterventionalRadiologyImg },
        { value: "مسالك بولية", en: "Urology Physician", img: UrologyImg },
        { value: "معامل تحاليل", en: "Laboratories Physician", img: LaboratoriesImg },
        { value: "ممارسة عامة", en: "General Practice Physician", img: GeneralPracticeImg },
    ],
    cities : [
        { value: "كل المحافظات", en: "All Governorates"  },
        { value: "القاهرة", en: "Cairo" },
        { value: "الجيزة", en: "Giza" },
        { value: "الاسكندرية", en: "Alexandria" },
        { value: "الساحل الشمالي", en: "North Coast" },
        { value: "القليوبية", en: "Qalyubia" },
        { value: "الغربية", en: "Gharbia" },
        { value: "المنوفية", en: "Menoufia" },
        { value: "الفيوم", en: "Faiyum" },
        { value: "الدقهلية", en: "Dakahlia" },
        { value: "الشرقية", en: "Sharqia" },
        { value: "البحيرة", en: "Beheira" },
        { value: "دمياط", en: "Damietta" },
        { value: "مطروح", en: "Matrouh" },
        { value: "أسيوط", en: "Assiut" },
        { value: "الإسماعيلية", en: "Ismailia" },
        { value: "الغردقة", en: "Hurghada" },
        { value: "شرم الشيخ", en: "Sharm El Sheikh" },
        { value: "بورسعيد", en: "Port Said" },
        { value: "السويس", en: "Suez" },
        { value: "سوهاج", en: "Sohag" },
        { value: "المنيا", en: "Minya" },
        { value: "كفر الشيخ", en: "Kafr El Sheikh" },
        { value: "الاقصر", en: "Luxor" },
        { value: "قنا", en: "Qena" },
        { value: "أسوان", en: "Aswan" },
        { value: "بني سويف", en: "Beni Suef" }
    ],
    areas: {
        "all governorates": [
            { value: "All Areas", en: "All Areas" },
        ],
        "cairo": [
        { value: "كل المناطق", en: "All Areas"},
            { value: "مصر الجديدة", en: "Heliopolis" },
            { value: "مدينة نصر", en: "Nasr City" },
            { value: "مدينة نصر - المنطقة الأولى", en: "Nasr City - District 1" },
            { value: "مدينة نصر - المنطقة الثانية", en: "Nasr City - District 2" },
            { value: "مدينة نصر - الحي العاشر", en: "Nasr City - 10th District" },
            { value: "مدينة نصر - الحي السابع", en: "Nasr City - 7th District" },
            { value: "مدينة نصر - زهراء مدينة نصر", en: "Nasr City - Zahraa" },
            { value: "مدينة نصر - عباس العقاد", en: "Nasr City - Abbas El Akkad" },
            { value: "مدينة نصر - مكرم عبيد", en: "Nasr City - Makram Ebeid" },

            { value: "المعادي", en: "Maadi" },
            { value: "المعادي الجديدة", en: "New Maadi" },
            { value: "زهراء المعادي", en: "Zahraa Maadi" },
            { value: "حدائق المعادي", en: "Maadi Gardens" },

            { value: "التجمع الأول", en: "First Settlement" },
            { value: "التجمع الثالث", en: "Third Settlement" },
            { value: "التجمع الخامس", en: "Fifth Settlement" },
            { value: "مدينتي", en: "Madinaty" },
            { value: "الرحاب", en: "Rehab City" },

            { value: "المقطم", en: "Mokattam" },
            { value: "الهضبة الوسطى", en: "Middle Plateau" },
            { value: "الهضبة العليا", en: "Upper Plateau" },

            { value: "عين شمس", en: "Ain Shams" },
            { value: "عين شمس الغربية", en: "West Ain Shams" },
            { value: "عين شمس الشرقية", en: "East Ain Shams" },

            { value: "المطرية", en: "El Mataria" },
            { value: "الزيتون", en: "Zeitoun" },
            { value: "حدائق الزيتون", en: "Hadaeq Zeitoun" },

            { value: "حدائق القبة", en: "Hadaeq El Qobba" },
            { value: "الخليفة", en: "El Khalifa" },
            { value: "المنيل", en: "El Manial" },
            { value: "السيدة زينب", en: "Sayyida Zeinab" },
            { value: "وسط البلد", en: "Downtown" },

            { value: "شبرا", en: "Shubra" },
            { value: "شبرا مصر", en: "Shubra Masr" },
            { value: "روكسي", en: "Roxy" },
            { value: "الكوربة", en: "Korba" },

            { value: "العباسية", en: "Abbaseya" },
            { value: "الوايلي", en: "El Waili" },

            { value: "المرج", en: "El Marg" },
            { value: "المرج الجديدة", en: "New Marg" },

            { value: "مدينة السلام", en: "El Salam City" },
            { value: "السلام 1", en: "Salam 1" },
            { value: "السلام 2", en: "Salam 2" },

            { value: "مدينة المستقبل", en: "Mostakbal City" },
            { value: "مدينة بدر", en: "Badr City" },

            { value: "مصر القديمة", en: "Old Cairo" },
            { value: "الفسطاط", en: "Fustat" },
            { value: "دار السلام", en: "Dar El Salam" },

            { value: "حلوان", en: "Helwan" },
            { value: "حدائق حلوان", en: "Hadayek Helwan" },
            { value: "المعصرة", en: "Maasara" },
            { value: "طرة", en: "Tora" },

            { value: "النزهة الجديدة", en: "New Nozha" },
            { value: "النزهة", en: "Nozha" },
            { value: "هليوبوليس الجديدة", en: "New Heliopolis" },

            { value: "جسر السويس", en: "Gesr El Suez" },
            { value: "مدينة قباء", en: "Qobaa City" },

            { value: "القطامية", en: "Katameya" },
            { value: "عزبة النخل", en: "Ezbet El Nakhl" },
            { value: "بولاق", en: "Bulaq" }
     ],
        "giza": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "الهرم", en: "Al Haram" },
         { value: "الوراق", en: "El Warraq" },
         { value: "الدقي", en: "Dokki" },
         { value: "المهندسين", en: "Mohandessin" },
         { value: "الجيزة", en: "Giza" },
         { value: "الصف", en: "Saf" },
         { value: "أوسيم", en: "Oaseem" },
         { value: "العجوزة", en: "Agouza" },
         { value: "كرداسة", en: "Kerdasa" },
         { value: "منشأة القناطر", en: "Manshiyet Al Qanater" },
         { value: "العياط", en: "Al Ayat" },
         { value: "البدرشين", en: "Badrashin" },
         { value: "أبو النمرس", en: "Abu Nomros" },
         { value: "الواحات البحرية", en: "Al Wahat El Bahariya" },
         { value: "الشيخ زايد", en: "Sheikh Zayed" },
         { value: "6 أكتوبر", en: "6th of October" },
         { value: "الحوامدية", en: "Hawamdiyah" },
         { value: "أطفيح", en: "Atfih" },
         { value: "الصفطا", en: "Safata" },
         { value: "كفر غطاطي", en: "Kafr Ghati" }
     ],
        "alexandria": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "وسط المدينة", en: "Downtown" },
         { value: "سموحة", en: "Smouha" },
         { value: "المنتزه أول", en: "Montaza 1st" },
         { value: "المنتزه ثاني", en: "Montaza 2nd" },
         { value: "العجمي", en: "Agamy" },
         { value: "محرم بك", en: "Moharam Bek" },
         { value: "المنشية", en: "El Mansheya" },
         { value: "الزهراء", en: "El Zahraa" },
         { value: "كليوباترا", en: "Cleopatra" },
         { value: "باب شرق", en: "Bab Sharq" },
         { value: "برج العرب", en: "Borg El Arab" },
         { value: "برج العرب الجديدة", en: "New Borg El Arab" },
         { value: "ميامي", en: "Miami" },
         { value: "سيدي جابر", en: "Sidi Gaber" },
         { value: "كفر عبده", en: "Kafr Abdo" },
         { value: "الدخيلة", en: "El Dekheila" },
         { value: "العامرية أول", en: "Amreya 1st" },
         { value: "العامرية ثاني", en: "Amreya 2nd" },
         { value: "الرمل أول", en: "Raml 1st" },
         { value: "الرمل ثاني", en: "Raml 2nd" },
         { value: "اللبان", en: "El Labban" },
         { value: "ميناء البصل", en: "Mina El Basal" },
         { value: "سيدى بشر", en: "Sidi Bishr" }
     ],
        "beheira": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "دمنهور", en: "Damanhour" },
         { value: "كفر الدوار", en: "Kafr El Dawar" },
         { value: "المحمودية", en: "Mahmoudiyah" },
         { value: "شبراخيت", en: "Shubrakhit" },
         { value: "أبو حمص", en: "Abu Homs" },
         { value: "رشيد", en: "Rashid" },
         { value: "إيتاي البارود", en: "Itay El Baroud" },
         { value: "حوش عيسى", en: "Housh Eissa" },
         { value: "كوم حمادة", en: "Kom Hamada" },
         { value: "الدلنجات", en: "Delengat" },
         { value: "أبو المطامير", en: "Abu Al-Matamir" },
         { value: "إدكو", en: "Edko" },
         { value: "المحرز", en: "Mehrez" }
     ],
        "dakahlia": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "المنصورة", en: "Mansoura" },
         { value: "ميت غمر", en: "Meet Ghamr" },
         { value: "طلخا", en: "Talkha" },
         { value: "شربين", en: "Sherbin" },
         { value: "دكرنس", en: "Dekernes" },
         { value: "السنبلاوين", en: "Sinbillawin" },
         { value: "أجا", en: "Aga" },
         { value: "بلقاس", en: "Belqas" },
         { value: "جمصة", en: "Gamasa" },
         { value: "منية النصر", en: "Meniat El Nasr" },
         { value: "نبروة", en: "Nabrouh" },
         { value: "المطرية", en: "El Mataria" },
         { value: "تمى الأمديد", en: "Tami El Amdeed" },
         { value: "بني عبيد", en: "Bani Ubaid" },
         { value: "المنزلة", en: "Menzla" },
         { value: "كفر سعد", en: "Kafr Saad" }
     ],
        "menoufia": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "شبين الكوم", en: "Shebin El Kom" },
         { value: "منوف", en: "Menouf" },
         { value: "قويسنا", en: "Quesna" },
         { value: "سرس الليان", en: "Sars El Layan" },
         { value: "تلا", en: "Tala" },
         { value: "أشمون", en: "Ashmon" },
         { value: "السادات", en: "Sadat City" },
         { value: "الباجور", en: "El Bagour" },
         { value: "الشهداء", en: "El Shohada" },
         { value: "أرمنت", en: "Armant" } // مناطق إضافية صغيرة
     ],
        "sharqia": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "الزقازيق", en: "Zagazig" },
         { value: "منيا القمح", en: "Minya El Qamh" },
         { value: "بلبيس", en: "Belbeis" },
         { value: "فاقوس", en: "Faqous" },
         { value: "ههيا", en: "Hehia" },
         { value: "أبو حماد", en: "Abu Hammad" },
         { value: "أبو كبير", en: "Abu Kebir" },
         { value: "ديرب نجم", en: "Deirb Negm" },
         { value: "الحسينية", en: "El Husseiniya" },
         { value: "مشتول السوق", en: "Mashtoul El Souq" },
         { value: "كفر صقر", en: "Kafr Saqr" },
         { value: "الصالحية الجديدة", en: "New Salheya" },
         { value: "القرين", en: "El Qurein" },
         { value: "فاقوس الجديدة", en: "New Faqous" },
         { value: "أولاد صقر", en: "Awlad Saqr" }
     ],
        "faiyum": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "الفيوم", en: "Faiyum" },
         { value: "سنورس", en: "Sinnuris" },
         { value: "طامية", en: "Tamiya" },
         { value: "إطسا", en: "Itsa" },
         { value: "يوسف الصديق", en: "Yusuf El Sedeik" },
         { value: "أبشواي", en: "Abshway" },
         { value: "إطسا الجديدة", en: "New Itsa" },
         { value: "إبشواي الغربية", en: "West Abshway" },
         { value: "الفشن", en: "Fashn" }
     ],
        "gharbia": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "طنطا", en: "Tanta" },
         { value: "المحلة الكبرى", en: "El Mahalla El Kubra" },
         { value: "كفر الزيات", en: "Kafr El Zayat" },
         { value: "زفتى", en: "Zefta" },
         { value: "بسيون", en: "Basyoun" },
         { value: "السنطة", en: "El Santa" },
         { value: "سمنود", en: "Samannoud" },
         { value: "قطور", en: "Qutour" },
         { value: "المحلة الجديدة", en: "New Mahalla" },
         { value: "أجا", en: "Aga" } // مناطق إضافية صغيرة
     ],
        "Qalyubia": [
            { value: "كل المناطق", en: "All Areas" },
         { value: "بنها", en: "Banha" },
         { value: "قليوب", en: "Qalyub" },
         { value: "شبين القناطر", en: "Shibin El Qanater" },
         { value: "كفر شكر", en: "Kafr Shukr" },
         { value: "طوخ", en: "Tukh" },
         { value: "القناطر الخيرية", en: "Qanater El Khayreya" },
         { value: "الخانكة", en: "El Khanka" },
         { value: "العبور", en: "El Obour" },
         { value: "الخصوص", en: "El Khosous" },
         { value: "القرين", en: "El Qurein" }
     ]
    }


}
export default filtersOptions;