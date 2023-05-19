import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';

import { Server } from 'socket.io';
import { io } from 'socket.io-client';

export {express, cors, dotenv, fs, Server, io };