// Solution
class FindTheMower {
  getValuesFromUser() {
    // Get the maximum cordinates.
    this.xmax = +document.getElementById("xmax").value;
    this.ymax = +document.getElementById("ymax").value;
    // Minimum x and y for the initial values is assumed to be zero.
    this.xmin = 0;
    this.ymin = 0;
    // Current initial positions of x and y
    this.xcurrent = +document.getElementById("xinit").value; 
    this.ycurrent = +document.getElementById("yinit").value;
    // Initial orientation of the mower.
    this.direction = document.getElementById("directionInit").value;
    // Get the movement from the user.
    this.movement = document.getElementById("movementCommand").value;
  }

  // Move the mower based on the input.
  move() {
    try {
        // Get the values from the user.
        this.getValuesFromUser();

        // The movement of the mower is stored as an array
        let movement = this.movement.split("");

        // Iterate through the movements
        for (let i in movement) {
            console.log(movement[i]);
            switch (movement[i]) {
                case "L":
                    this.direction = this.updatedDirection("L");
                    break;
                case "R":
                    this.direction = this.updatedDirection("R");
                    break;
                case "F":
                    this.updatePosition();
                    break;
                default:
                    break;
            }
        }
    }catch(e){
        alert("Error occured. Please enter correct values in the fields");
    }

    // Print the current direction and coordinates.
    let output = document.getElementById("output");
    output.innerHTML = "The lawnmover moved to <br><br>"+this.xcurrent+" "+this.ycurrent+" "+this.direction;
  }

  // Direction pointer to extract current direction.
  updatedDirection(newDirection) {
    let directionLoop = ["W", "N", "E", "S"];
    let currentIndex = directionLoop.indexOf(this.direction);
    // Assuming we only pass two direction inputs left and right.
    if (newDirection === "L" ) {
      currentIndex = currentIndex - 1;
      return currentIndex < 0 ? directionLoop[3] : directionLoop[currentIndex]; // Turns 90 degress left.
    } else {
      currentIndex = currentIndex + 1;
      return currentIndex > 3 ? directionLoop[0] : directionLoop[currentIndex]; // Turns 90 degree right.
    }
  }

  // Update position of the x and y coordinates.
  updatePosition() {
    let moveDirection = this.direction + "F";
    // Update the move positioning in the system. North/South Indicates Y movement and East/West X movement.
    switch (moveDirection) {
      case "NF":
          let ynext = this.ycurrent + 1;
          this.ycurrent = (ynext <= this.ymax) ? ynext : this.ycurrent;
          break;
      case "WF":
          let xprevious = this.xcurrent - 1;
          this.xcurrent = (xprevious >= this.xmin) ? xprevious : this.xcurrent;
          break;
      case "EF":
          let xnext = this.xcurrent + 1;
          this.xcurrent = (xnext <= this.xmax) ? xnext : this.xcurrent;
          break;
      case "SF":
          let yprevious = this.ycurrent - 1;
          this.ycurrent = (yprevious >= this.ymin) ? yprevious : this.ycurrent;
          break;
      default:
          break;
    }
  }
}
// Accessing the class from an html button click.
function moveMower() {
    var mover = new FindTheMower();
    mover.move();
}