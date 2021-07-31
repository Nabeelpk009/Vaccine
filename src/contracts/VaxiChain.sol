pragma solidity ^0.6.2;

contract VaxiChain{
    
    mapping(string => Manufacture) public manufacture;
    mapping(string => Distributor) public distributor;
    mapping(string => Doctor) public doctor;
    mapping(string => Vaccine) public vaccine;
    mapping(string => VaccineCenter) public vaccineCenter;
    mapping(string => Beneficiary) public beneficiary;
    mapping(string => Rules ) public rules;
    mapping(string => Violation ) public violation;
    mapping(string => OnDemand) public onDemand;
    mapping(uint => SideEffects) public sideEffects;
    

    uint256 public manufactureCount = 0;
    uint256 public distributorCount = 0;
    uint256 public vaccineCenterCount = 0;
    uint256 public beneficiaryCount = 0;
    uint256 public doctorCount = 0;
    uint256 public doseCount = 0;
    uint256 public sideEffectCount = 0;
    

    struct Manufacture{
        string licenceNO;
        string name;
        string location;
    }
    
    struct OnDemand{
        uint256 doses;
    }
    
    struct Rules{
        string vaccine_id;
        uint min_temp;
        uint max_temp;
        uint doses;
        string expdate;
        
    }
    
    struct Violation{
        string vaccine_id;
        bool violated;
    }
    
    struct SideEffects{
        string vaccine_id;
        string beneficiary_id;
        string sideEffect;
    }
    
    struct Vaccine{
        string vaccine_id;
        string name;
        uint vails;
        string manufaturedDate;
        uint manufactureId;
        string arrived_dateDistributor;
        uint distributorId;
        string arrived_dateVaccineCenter;
        uint vaccineCenterId;
    }
    
    struct Distributor{
        uint dlicenceNo;
        string dname;
        
   }
   
    struct VaccineCenter{
        string licenceNO;
        string name;       
        string phone;
        string location;

   }
   
    struct Doctor{
        string licenceNO;
        string name;     
        string phone;
   }  

    struct Beneficiary{
        string name;
        uint age;
        string gender;
        string adharID;
        uint doctorID;
        string vaccinated_date;
        string vaccine_center;
        bool vaccinated;
    }
   
    
    function AddManufacture(string memory licenceNo, string memory name, string memory location) public
    {
       manufactureCount++;
       manufacture[licenceNo] = Manufacture(licenceNo, name, location);
    }
  
   function RegisterDistributor(uint dlicenceNo, string memory dname) public
   {
        distributorCount++;
        distributor[dlicenceNo] = Distributor(dlicenceNo, dname);
    }
  
    function AddVaccineCenter(string memory licenceNo, string memory name,  string memory phone,  string memory location) public
    {
        vaccineCenterCount++;
        vaccineCenter[licenceNo] = VaccineCenter(licenceNo, name, phone, location);
    }
        
    function AddBeneficiary(string memory name, uint age, string memory gender, string memory  adharID, uint doctorID, string memory vaccinated_date,  string memory vaccine_center, bool vaccinated ) public{
        beneficiaryCount++;
        beneficiary[adharID] = Beneficiary(name, age, gender, adharID, doctorID, vaccinated_date,vaccine_center,vaccinated);
   }  
   
   function VaccineRegister(string memory vaccine_name) public
   {
       onDemand[vaccine_name].doses += 1; 
   }
   
   function AddDoctor(string memory licenseNo, string memory name, string memory phone)public{
       doctorCount++;
       doctor[licenseNo] = Doctor(licenseNo, name, phone);
   }
   
   function ManuFacturedVaccine(string memory id, string memory name, uint vails, string memory manufaturedDate, uint manufactureID, string memory arrived_date_distributor, uint distributor, string memory arrived_date_vaccine_center, uint vaccine_center )public
   {
       vaccine[id] = Vaccine(id, name, vails, manufaturedDate, manufactureID, arrived_date_distributor, distributor,  arrived_date_vaccine_center, vaccine_center);
       onDemand[name] = OnDemand(0);
   }
   
   function AddRules(string memory id, uint min_temp, uint max_temp, uint doses, string memory expdate)public
   {
        rules[id] = Rules(id, min_temp, max_temp, doses, expdate);
   }
   
   function AddViolation(string memory id)public
   {
       violation[id] = Violation(id, false);
   }
   
   function AddSideEffect(string memory id, string memory beneficiary_id, string memory txt)public
   {
       sideEffectCount++;
       sideEffects[sideEffectCount] = SideEffects(id, beneficiary_id, txt);
   }
   
   function ArrivedDistributor(string memory id, string memory arrived_date, uint distributor_id)public
   {
       vaccine[id].arrived_dateDistributor = arrived_date;
       vaccine[id].distributorId = distributor_id;
   }
   
   function ArrivedVaccineCenter(string memory id, string memory arrived_date, uint vaccine_center_id)public
   {
       vaccine[id].arrived_dateVaccineCenter = arrived_date;
       vaccine[id].vaccineCenterId = vaccine_center_id;
   }

   function Vaccinated(string memory adharID, uint doctorID, string memory vaccinated_date,  string memory vaccine_center,bool vaccinated) public
   {
       beneficiary[adharID].doctorID = doctorID;
       beneficiary[adharID].vaccinated_date = vaccinated_date;
       beneficiary[adharID].vaccine_center = vaccine_center;
       beneficiary[adharID].vaccinated = true;
   }

   function TrackVaccine(string memory vaccine_id) public view returns(string memory,string memory,uint,string memory,uint,string memory,uint,string memory,uint)
   {
       return(vaccine[vaccine_id].vaccine_id,vaccine[vaccine_id].name,vaccine[vaccine_id].vails,vaccine[vaccine_id].manufactureId,vaccine[vaccine_id].arrived_dateDistributor,vaccine[vaccine_id].distributorId,vaccine[vaccine_id].arrived_dateVaccineCenter,vaccine[vaccine_id].vaccineCenterId);
   }
    
   function tracking(string memory vaccine_id, uint temp)public
   {
       if(temp < rules[vaccine_id].max_temp && temp > rules[vaccine_id].min_temp)
       {
           violation[vaccine_id].violated = true;
       }
       else
       {
           violation[vaccine_id].violated = false;
       }
   }
}