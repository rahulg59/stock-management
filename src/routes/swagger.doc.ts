/**
 * @swagger
 * components:
 *   schemas:
 *     ApparelStock:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *         size:
 *           type: string
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /api/apparel/update:
 *   post:
 *     summary: Update stock and price for a single apparel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApparelStock'
 *     responses:
 *       200:
 *         description: Stock updated
 */

/**
 * @swagger
 * /api/apparel/batch-update:
 *   post:
 *     summary: Batch update multiple apparel stock and prices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ApparelStock'
 *     responses:
 *       200:
 *         description: Batch stock updated
 */

/**
 * @swagger
 * /api/apparel/can-fulfill:
 *   post:
 *     summary: Check if an order can be fulfilled
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 size:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Whether the order can be fulfilled
 */

/**
 * @swagger
 * /api/apparel/lowest-cost:
 *   post:
 *     summary: Get the lowest cost to fulfill an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                 size:
 *                   type: string
 *                 quantity:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Total cost if the order can be fulfilled
 */