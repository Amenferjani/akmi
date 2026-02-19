import * as migration_20260215_155603_init from './20260215_155603_init';
import * as migration_20260215_160430_edit_users from './20260215_160430_edit_users';
import * as migration_20260215_160520_edit_users from './20260215_160520_edit_users';
import * as migration_20260215_163040_add_coach_athlete_join from './20260215_163040_add_coach_athlete_join';
import * as migration_20260215_163137_add_coach_athlete_join from './20260215_163137_add_coach_athlete_join';
import * as migration_20260215_182121_edit_users from './20260215_182121_edit_users';
import * as migration_20260216_132144_edit_users from './20260216_132144_edit_users';
import * as migration_20260216_134624_edit_users from './20260216_134624_edit_users';
import * as migration_20260216_135519_edit_users from './20260216_135519_edit_users';
import * as migration_20260217_181113_add from './20260217_181113_add';
import * as migration_20260218_113841_edit from './20260218_113841_edit';

export const migrations = [
  {
    up: migration_20260215_155603_init.up,
    down: migration_20260215_155603_init.down,
    name: '20260215_155603_init',
  },
  {
    up: migration_20260215_160430_edit_users.up,
    down: migration_20260215_160430_edit_users.down,
    name: '20260215_160430_edit_users',
  },
  {
    up: migration_20260215_160520_edit_users.up,
    down: migration_20260215_160520_edit_users.down,
    name: '20260215_160520_edit_users',
  },
  {
    up: migration_20260215_163040_add_coach_athlete_join.up,
    down: migration_20260215_163040_add_coach_athlete_join.down,
    name: '20260215_163040_add_coach_athlete_join',
  },
  {
    up: migration_20260215_163137_add_coach_athlete_join.up,
    down: migration_20260215_163137_add_coach_athlete_join.down,
    name: '20260215_163137_add_coach_athlete_join',
  },
  {
    up: migration_20260215_182121_edit_users.up,
    down: migration_20260215_182121_edit_users.down,
    name: '20260215_182121_edit_users',
  },
  {
    up: migration_20260216_132144_edit_users.up,
    down: migration_20260216_132144_edit_users.down,
    name: '20260216_132144_edit_users',
  },
  {
    up: migration_20260216_134624_edit_users.up,
    down: migration_20260216_134624_edit_users.down,
    name: '20260216_134624_edit_users',
  },
  {
    up: migration_20260216_135519_edit_users.up,
    down: migration_20260216_135519_edit_users.down,
    name: '20260216_135519_edit_users',
  },
  {
    up: migration_20260217_181113_add.up,
    down: migration_20260217_181113_add.down,
    name: '20260217_181113_add',
  },
  {
    up: migration_20260218_113841_edit.up,
    down: migration_20260218_113841_edit.down,
    name: '20260218_113841_edit'
  },
];
