import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostTypeSeeds1737646293213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 기본 게시글 타입 데이터 추가
    await queryRunner.query(`
            INSERT INTO post_types 
            (type, name, description, is_active, read_permission_roles, write_permission_roles) 
            VALUES 
            (
                'NOTICE', 
                '공지사항',
                '중요 안내사항이 게시되는 공간입니다.',
                true,
                JSON_ARRAY('USER', 'ADMIN'),
                JSON_ARRAY('ADMIN')
            ),
            (
                'QNA',
                'Q&A',
                '질문과 답변을 주고받는 공간입니다.',
                true,
                JSON_ARRAY('USER', 'ADMIN'),
                JSON_ARRAY('USER', 'ADMIN')
            ),
            (
                'FAQ',
                '자주 묻는 질문',
                '자주 묻는 질문과 답변을 모아둔 공간입니다.',
                true,
                JSON_ARRAY('USER', 'ADMIN'),
                JSON_ARRAY('ADMIN')
            ),
            (
                'FREE',
                '자유게시판',
                '자유롭게 의견을 나누는 공간입니다.',
                true,
                JSON_ARRAY('USER', 'ADMIN'),
                JSON_ARRAY('USER', 'ADMIN')
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 롤백 시 추가된 데이터 삭제
    await queryRunner.query(`
            DELETE FROM post_types 
            WHERE type IN ('NOTICE', 'QNA', 'FAQ', 'FREE')
        `);
  }
}
