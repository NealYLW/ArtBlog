class Underground:
    def __init__(self, entrance, exit) -> None:
        self.entrance = entrance
        self.exit = exit

    def get_exit(self):
        return self.exit

    def Enter(self,station):
        if station in self.entrance:
            return station
        else: 
            raise Exception("No entrances found")
        
class Person:
    def __init__(self, name, fear, dependancy,courage) -> None:
        self.name = name
        self.fear = fear
        self.dependancy = dependancy
        self.couage = courage
    def Leave(self,exit):
        if not(exit in Underground.get_exit):
            raise Exception("Exit Blocked.")
        elif self.fear>=70 or self.dependancy>=80 or self.courage<=50:
            raise Exception("Fail to exit.  Return to underground")
    def retry(self):
        raise Exception("Fail to exit.  Return to underground")
    
class BlackBird:
    def __init__(self, cawing, flying) -> None:
        self.caw=cawing
        self.fly = flying

# Story begins here
Person_A = Person('A',97,165,24)
Person_A.Leave "ERROR: Fail to exit.  Return to underground"
BlackBird = new BlackBird() BlackBird = new BlackBird()
Person_A.retry "ERROR: Fail to exit.  Return to underground"
BlackBird = new BlackBird()
BlackBird = new BlackBird()
Person_A.retry "ERROR: Fail to exit.  Return to underground"
BlackBird = new BlackBird()
Person_A.retry "ERROR: Fail to exit.  Return to underground"
Person_A.retry "ERROR: Fail to exit.  Return to underground"
BlackBird = new BlackBird()
Person_A.retry "ERROR: Fail to exit.  Return to underground"
