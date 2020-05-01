#!/bin/bash
newman run Parallel_Run_in_Postman.json --folder request &
newman run Parallel_Run_in_Postman.json --folder response &
newman run Parallel_Run_in_Postman.json --folder 'time'