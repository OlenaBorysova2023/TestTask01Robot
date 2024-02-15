# Task: Robot programming

Your task is to develop the control program for a robot. The robot is located in a 2 dimensional room.

The robot moves in the room by interpreting a string of commands.

3 languages for commands should be handled.

* English

> L - Turn left, R - Turn right, F - Move forward

Example: `LFFRFRFRFF`

* Swedish

> V - Turn left, H - Turn right, G - Move forward

Example: `VGGHGHGHGG`

* French

> G - Turn left, D - Turn right, A - move forward

Example: `GAADADADAA`

When all commands are executed the program should report which coordinate (x,y) the robot is located at and what direction the robot is facing.

At start the robot is always facing north.
The room can have two shapes, either square ((0,0) is the top left position) or circular ((0,0) is at the center of the circle).

## Example 1

We select a square room and set it's size to 5x5 and the start position for the robot at (1,2)

Given the instructions (in swedish) `HGHGGHGHG`, give the result: `1 3 N`

## Example 2

We select a circular room with a radius of 10. We give the starting position (0, 0) and to use english commands.
With the instructions `RRFLFFLRF`, gives the result: `3 1 E`

## How

* We want you to build a UI for web browsers for this with the help of a ”MV\*-framework” (see [TodoMVC](http://todomvc.com/)). Pick a framework you like and that is appropriate for the task.

* The user will provide the application with input data. Use appropriate html elements for the input options. You do not have to draw the room on the screen, it is enough to report the position and direction of the robot. Apply styling to the UI. Keep it simple, but it should look ”ok”.
